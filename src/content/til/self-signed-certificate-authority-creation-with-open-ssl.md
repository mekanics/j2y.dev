---
title: Self-Signed Certificate Authority Creation with OpenSSL
date: "2025-06-23"
tags:
  - homelab
  - kubernetes
  - openssl
  - ssl
  - cert-manager
  - security
draft: false
---

When running a homelab and managing internal services, SSL/TLS certificates are needed for secure communication. While public Certificate Authorities like [Let's Encrypt](https://letsencrypt.org/) work great for internet-facing services, they're not always practical for internal infrastructure. Creating your own Certificate Authority (CA) solves this problem.

This post covers creating a self-signed Certificate Authority using OpenSSL and configuring it to work with cert-manager in Kubernetes for automated certificate management.

## Why Create Your Own CA

The main reasons for creating your own CA:

- **Internal Services**: Perfect for services that only need to communicate within your network
- **Development Environment**: Avoid certificate warnings during development
- **Cost-Effective**: No need to purchase certificates for internal use
- **Full Control**: You control the entire certificate lifecycle
- **Client Certificate Authentication**: Secure services by requiring client certificates for access, providing strong mutual TLS (mTLS) authentication
- **Learning**: Great way to understand how PKI (Public Key Infrastructure) works

## Requirements

This setup requires:

- OpenSSL installed on your system
- kubectl configured for your Kubernetes cluster
- cert-manager installed in your cluster
- [kubeseal](https://github.com/bitnami-labs/sealed-secrets) (SealedSecrets controller) if using GitOps

## Implementation Steps

### 1. Generate an ECDSA Private Key for the CA

First, create a private key using the ECDSA algorithm with the prime256v1 curve. ECDSA is preferred over RSA for its smaller key size and better performance while maintaining strong security.

```bash
openssl ecparam -name prime256v1 -genkey -noout -out ca.key
```

This command:

- Uses the `prime256v1` elliptic curve (also known as secp256r1)
- Generates a new key without outputting the curve parameters (`-noout`)
- Saves the private key to `ca.key`

### 2. Create a Self-Signed Root CA Certificate

Next, create the root certificate that will be used to sign other certificates:

```bash
openssl req -new -x509 -key ca.key -sha256 -out ca.crt -days 3650 \
-subj "/C=CH/ST=ZH/L=Zuerich/O=j2y/OU=Home/CN=homelab-root-cert/emailAddress=example@domain.com"
```

Let's break down the certificate subject fields:

- `/C=CH`: Country code (Switzerland in this example)
- `/ST=ZH`: State or Province (Zurich)
- `/L=Zuerich`: Locality or City
- `/O=j2y`: Organization Name
- `/OU=Home`: Organizational Unit
- `/CN=homelab-root-cert`: Common Name (identifies your CA)
- `/emailAddress=example@domain.com`: Email Address

The `-days 3650` option sets the certificate validity to 10 years. For a root CA, this is reasonable since you don't want to replace it frequently.

> **Important**: The Common Name (CN) for the CA certificate must be different from the CN of any certificates it signs.

### 3. Verify the Root Certificate

Before proceeding, verify that the certificate was created correctly:

```bash
openssl x509 -in ca.crt -text -noout
```

This command will display the certificate details in human-readable format. Look for:

- The correct subject information
- The validity period (should show your 10-year range)
- The signature algorithm (should be sha256WithEcdsa)
- The public key information

### 4. Create a Kubernetes Secret

Now create a Kubernetes secret containing both the CA certificate and private key. This secret will be used by cert-manager:

```shell
kubectl create secret tls ca-key-pair --cert=ca.crt --key=ca.key --namespace=cert-manager --dry-run=client -o yaml > secret.yaml
```

> **Note**: Make sure to specify the correct namespace where cert-manager is installed. The default is usually `cert-manager`.

### 5. Seal the Secret (Optional but Recommended)

If you're using GitOps practices with SealedSecrets, you should seal the secret to safely store it in your Git repository:

```shell
kubeseal --format yaml < secret.yaml > sealed-secret.yaml
```

This encrypts the secret so it can be safely committed to version control.

### 6. Deploy the Secret

Apply the secret (or sealed secret) to your cluster:

```shell
# If using regular secret
kubectl apply -f secret.yaml

# If using sealed secret
kubectl apply -f sealed-secret.yaml
```

### 7. Configure cert-manager to Use Your CA

Finally, create a ClusterIssuer that tells cert-manager to use your CA for signing certificates:

Create a file named `ca-issuer.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer # Use ClusterIssuer for cluster-wide access, or Issuer for namespace-specific
metadata:
  name: homelab-ca-issuer
  namespace: cert-manager
spec:
  ca:
    secretName: ca-key-pair
```

Apply the issuer to your cluster:

```shell
kubectl apply -f ca-issuer.yaml
```

## Using Your CA Issuer

Now that your CA is set up, you can use it to issue certificates. Here's an example of how to request a certificate:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-service-cert
  namespace: default
spec:
  secretName: my-service-tls
  issuerRef:
    name: homelab-ca-issuer
    kind: ClusterIssuer
  dnsNames:
    - my-service.local
    - my-service.default.svc.cluster.local
```

## Troubleshooting

Common issues you might encounter:

- **Certificate not trusted**: Make sure the CA certificate is installed in the trust store of client systems
- **CN conflicts**: Ensure the CA's Common Name differs from any certificates it signs
- **Namespace issues**: Verify cert-manager is running in the expected namespace
- **Secret not found**: Check that the secret was created in the correct namespace

## Conclusion

Creating your own Certificate Authority provides a robust foundation for secure internal communications in your homelab or development environment. With cert-manager handling the certificate lifecycle automatically, you can focus on building your services while maintaining proper security practices.

Your local network now has its own self-signed CA, and cert-manager will use it to issue new signed certificates for secure internal communications. Remember to handle the CA private key (`ca.key`) with utmost security to prevent unauthorized certificate issuance.

This setup gives you the flexibility and control needed for internal PKI management while maintaining the convenience of automated certificate provisioning through cert-manager.
