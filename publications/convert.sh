#!/usr/bin/env bash

python categorizePublications.py
python toContentfulJSON.py
fixjson -w import.json
