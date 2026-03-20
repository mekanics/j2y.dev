---
title: Simple Snippet to Add a Help Description to a Bash Script
date: "2025-10-26"
tags:
  - cli
  - bash
  - awk
  - unix
  - documentation
draft: false
---
This is my standard boilerplate to add a help documentation to a bash script.

```bash
#!/bin/bash
###
### my-awesome-script — a meaningful description of the script
###
### Usage:
###   my-awesome-script [option]
###
### Options:
###   -d, --do-something      Do something
###   -h, --help              Show this help message and exit

help() {
    awk -F'### ' '/^###/ { print $2 }' "$0"
    exit
}

do_something() {
    echo "Doing something"
}

# Parse command line arguments
case "${1:-}" in
    -d|--do-something)
        do_something
        ;;
    -h|--help|"")
        help
        ;;
    *)
        echo "Error: Unknown option '$1'"
        help
        ;;
esac
```

### Example output

```bash
$ my-awesome-script --help
my-awesome-script — a meaningful description of the script

Usage:
  my-awesome-script [option]

Options:
  -d, --do-something      Do something
  -h, --help              Show this help message and exit
```

### What the help function does

The `help()` function extracts and displays help documentation that's embedded directly in the script file itself. It uses `awk` to parse the script and find lines that contain help text.

Breaking down the `awk` command:

* `-F'### '`: Sets the field separator to `### `
* `/^###/`: Matches lines that start with `###`
* `{ print $2 }`: Prints the second field (the help text)
