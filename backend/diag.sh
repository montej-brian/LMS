#!/bin/bash
echo "Diagnostic started at $(date)" > debug_log.txt
echo "Current user: $(whoami)" >> debug_log.txt
echo "Current directory: $(pwd)" >> debug_log.txt
echo "Directory content:" >> debug_log.txt
ls -la >> debug_log.txt
echo "Testing write permissions:" >> debug_log.txt
touch write_test.txt && echo "Write successful" >> debug_log.txt || echo "Write failed" >> debug_log.txt
rm write_test.txt
echo "Checking node version:" >> debug_log.txt
node -v >> debug_log.txt
