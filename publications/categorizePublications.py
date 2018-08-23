# -*- coding utf-8 -*-
import bibtexparser
from bibtexparser.bibdatabase import BibDatabase
import logging
logging.basicConfig()
logger = logging.getLogger('logger')
import re
import json

# Read all the lines in the bib files and set them to their own arrays
mainLines = []
with open('CORI.bib') as f:
    mainLines = [line.rstrip('\n') for line in f]

animalHealth = []
animalHealthIds = []
with open('animalHealth.bib') as f:
    animalHealth = [line.rstrip('\n') for line in f]
for line in animalHealth:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        animalHealthIds.append(re.search(r'@.*\{(.*?),', line).group(1))

energeticsEcology = []
energeticsEcologyIds = []
with open('energeticsEcology.bib') as f:
    energeticsEcology = [line.rstrip('\n') for line in f]
for line in energeticsEcology:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        energeticsEcologyIds.append(re.search(r'@.*\{(.*?),', line).group(1))

howeSound = []
howeSoundIds = []
with open('howeSound.bib') as f:
    howeSound = [line.rstrip('\n') for line in f]
for line in howeSound:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        howeSoundIds.append(re.search(r'@.*\{(.*?),', line).group(1))

marineMammal = []
marineMammalIds = []
with open('marineMammal.bib') as f:
    marineMammal = [line.rstrip('\n') for line in f]
for line in marineMammal:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        marineMammalIds.append(re.search(r'@.*\{(.*?),', line).group(1))

oceanPollution = []
oceanPollutionIds = []
with open('oceanPollution.bib') as f:
    oceanPollution = [line.rstrip('\n') for line in f]
for line in oceanPollution:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        oceanPollutionIds.append(re.search(r'@.*\{(.*?),', line).group(1))

plastics = []
plasticsIds = []
with open('plastics.bib') as f:
    plastics = [line.rstrip('\n') for line in f]
for line in plastics:
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        plasticsIds.append(re.search(r'@.*\{(.*?),', line).group(1))

categorized = []
def findId(id, line):
    found = False
    if not found:
        for animalId in animalHealthIds:
            if id == animalId:
                categorized.append(line)
                categorized.append('comments = {vancouver-aquarium},')
                found = True
                return found

    if not found:
        for energeticsId in energeticsEcologyIds:
            if id == energeticsId:
                categorized.append(line)
                categorized.append('comments = {vancouver-aquarium},')
                found = True
                return found

    if not found:
        for howeSoundId in howeSoundIds:
            if id == howeSoundId:
                categorized.append(line)
                categorized.append('comments = {special-places},')
                found = True
                return found

    if not found:
        for marineId in marineMammalIds:
            if id == marineId:
                categorized.append(line)
                categorized.append('comments = {cori},')
                found = True
                return found

    if not found:
        for oceanId in oceanPollutionIds:
            if id == oceanId:
                categorized.append(line)
                categorized.append('comments = {cori},')
                found = True
                return found

    if not found:
        for plasticId in plasticsIds:
            if id == plasticId:
                categorized.append(line)
                categorized.append('comments = {plastics},')
                found = True
                return found

    return found

for i, line in enumerate(mainLines):
    if re.search(r'^@[article|book|booklet|inbook|incollection|inproceedings|manual|mastersthesis|misc|phdthesis|proceedings|techreport|unpublished]', line):
        id = re.search(r'@.*\{(.*?),', line).group(1)
        if id != '':
            found = findId(id, line)
            if not found:
                categorized.append(line)
    else:
        categorized.append(line)

with open('categorized.bib', 'w') as f:
    for line in categorized:
        f.write(line)
        f.write('\n')
