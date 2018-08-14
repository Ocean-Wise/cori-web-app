# -*- coding: utf-8 -*-
import bibtexparser
from bibtexparser.bibdatabase import BibDatabase
import logging
logging.basicConfig()
logger = logging.getLogger('logger');
import uuid
import re
from slugify import slugify
import json
from HTMLParser import HTMLParser
html = HTMLParser()

def unescape(s):
    try:
        if re.search(r'^\{.*\}$', s):
            out = s[1:-1]
        else:
            out = s
        out = re.sub(r'\{\\\&\}', '&', out)
        out = re.sub(r'\{\\\%\}', '%', out)
        out = re.sub(r'\{\\\_\}', '_', out)
        out = re.sub(r'\{\\\$\}', '$', out)
        out = re.sub(r'\{\\#\}', '#', out)
        out = re.sub(r'\{~\}', '~', out)
        out = re.sub(r'\{\\~\{\}\}', '~', out)
        out = re.sub(r'\{\\textless\}i\{\\textgreater\}', '', out)
        out = re.sub(r'\{\\textless\}', '', out)
        out = re.sub(r'\{\\textgreater\}', '', out)
        out = re.sub(r'emph\{\\\{\}', '', out)
        out = re.sub(r'\{\\\}\}', '', out)
        out = re.sub(r'\{\\textcopyright\}', '©', out)
        out = re.sub(r'\{\\O\}', 'O', out)
        out = re.sub(r"\{\\'\{E\}\}", 'E', out)
        out = re.sub(r"\{\\'\{e\}\}", 'e', out)
        out = re.sub(r"\{\\'\{a\}\}", 'a', out)
        out = re.sub(r"\{\\'\{A\}\}", 'A', out)
        out = re.sub(r"\{\\'\{i\}\}", 'i', out)
        out = re.sub(r"\{\\\^\{e\}\}", 'e', out)
        out = re.sub(r"\{\\\^\{E\}\}", 'E', out)
        out = re.sub(r"\{\\\^\{o\}\}", 'o', out)
        out = re.sub(r"\{\\\^\{O\}\}", 'O', out)
        out = re.sub(r"\{\\'\{o\}\}", 'o', out)
        out = re.sub(r"\{\\'\{O\}\}", 'O', out)
        out = re.sub(r"\{\\'\{c\}\}", 'c', out)
        out = re.sub(r"\{\\v\{c\}\}", 'c', out)
        out = re.sub(r'\{\\\"\{e\}\}', 'e', out)
        out = re.sub(r'\{\\\"\{E\}\}', 'E', out)
        out = re.sub(r"\$.*?\$", '', out)
        out = re.sub(r'/i', '', out)
        # Catchall to just remove any more BibTex special stuff
        out = re.sub(r'\{.*?\}', '', out)
        # Remove extraneous curly braces
        out = re.sub(r'\{', '', out)
        out = re.sub(r'\}', '', out)
        # Now actually escape things we want escaped in json
        out = re.sub(r'\"', '\\"', out)
        # Now unescape all the weird HTML hex entities that were not removed...
        out = html.unescape(out)
        return out
    except:
        return s


def joinNames(arr):
    out = []
    for name in arr:
        out.append(name[0].upper())
    return ''.join(out)

def authorify(author):
    arr = author.split()
    authorArr = []
    for item in arr:
        authorArr.append(re.sub(r'[,\.]', '', item))
    out = '{0}, {1}.'.format(unescape(authorArr[0]), joinNames(authorArr[1:]))
    return out

with open('CORI.bib') as f:
    bibtex = bibtexparser.load(f)

JSON = []

with open('import.json', 'w') as f:
    f.write('{\n')
    f.write('"entries": [\n')
    # Loop
    for entry in bibtex.entries:
        if entry['ENTRYTYPE'] == 'misc':
            with open('errors.txt', 'a') as errors:
                errors.write('Misc entry... {0}\n'.format(entry['ID']))
                errors.write('\n')
            continue
        entryString = ''
        try:
            if re.match(r'eanniard', entry['author']):
                with open('errors.txt', 'a') as errors:
                    errors.write('Silly author in entry {0}\n'.format(entry['ID']))
                    errors.write('\n')
                    continue
        except:
            with open('errors.txt', 'a') as errors:
                errors.write('No author in {0}\n'.format(entry['ID']))
                errors.write('\n')
            continue
        if entry['ID'] in {'Piggins1983', 'Best1981', 'Kuker2010', 'Tomlinson1963', 'Tomlinson1961', 'Tomlinson1958', 'Gallivan1986a', 'Schultz2016', 'Rosen2012', 'Rosen2018', 'Keech2010', 'Svard2009', 'Williams2011', 'Goundie2015', 'Rosen2008', 'Ladds2017a', 'Rea2009', 'Rosen2004', 'Hastie2006a', 'Dalton2014a', 'Hastie2007', 'Hindle2010b', 'Horning2017', 'Durban2010', 'Crossman2016', 'Durban2015', 'Ford2011', 'Heise2016a', 'Filatova2015', 'MacRae2011', 'Farrell1986', 'Best1985', 'Gallivan1983', 'Graham1983', 'Best1987', 'Burggren1979', 'Spong1971', 'Hewlett1968', 'Marliave:1989vf', 'Kelly2005', 'Ladds2017', 'Hindle2010', 'Rosen2012a'}:
            with open('errors.txt', 'a') as errors:
                errors.write('known error in entry {0}\n'.format(entry['ID']))
                errors.write('\n')
                continue
        if 'author' not in entry:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}. No Author\n'.format(entry['ID']))
                errors.write('\n')
                continue
        if 'title' not in entry:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}. No title\n'.format(entry['ID']))
                errors.write('\n')
                continue
        if 'year' not in entry:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}. No year\n'.format(entry['ID']))
                errors.write('\n')
                continue
        try:
            db = BibDatabase()
            db.entries = [entry]
            citationString = bibtexparser.dumps(db)
            citationString = citationString.replace('\n', '')
            citationString = json.dumps(citationString)
        except:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}n'.format(entry['ID']))
                errors.write('\n')
                continue
        try:
            entryString += '{\n'
            entryString += '"sys": {\n'
            if 'ID' in entry:
                entryString += '"id": "{0}",\n'.format(''.join(e for e in entry['ID'] if e.isalnum()))
            else:
                entryString += '"id": "{0}",\n'.format(uuid.uuid4())
            entryString += '"publishedVersion": 1,\n'
            entryString += '"contentType": {\n'
            entryString += '"sys": {\n'
            entryString += '"type": "Link",\n'
            entryString += '"linkType": "ContentType",\n'
            entryString += '"id": "researchPapers"\n'
            entryString += '}\n'
            entryString += '}\n'
            entryString += '},\n'
            entryString += '"fields": {\n'
            entryString += '"citation": {\n'
            entryString += '"en-US": {0}\n'.format(citationString)
            entryString += '},\n'
            try:
                if 'abstract' in entry:
                    abstract = unescape(entry['abstract'])
                    if '{' in out or '}' in out:
                        raise Exception('Abstract was not formatted properly...')
                    entryString += '"abstract": {\n'
                    try:
                        entryString += '"en-US": "{0}"\n'.format(abstract)
                    except:
                        entryString += '"en-US": "THIS NEEDS TO BE FIXED"\n'
                        with open('errors.txt', 'a') as errors:
                            errors.write('Error with entry {0}, at index {1}. Need to add abstract...\n'.format(entry['ID'], i))
                            errors.write('\n')
                    entryString += '},\n'
            except:
                with open('errors.txt', 'a') as errors:
                    errors.write('Error with entry {0}, at index {1}. Need to add abstract...\n'.format(entry['ID'], i))
                    errors.write('\n')
            if 'url' in entry:
                if (len(entry['url'].split(' ')) > 1):
                    url = unescape(entry['url'].split(' ')[0])
                else:
                    url = unescape(entry['url'])
                entryString += '"url": {\n'
                entryString += '"en-US": "{0}"\n'.format(url)
                entryString += '},\n'
            entryString += '"title": {\n'
            entryString += '"en-US": "{0}"\n'.format(unescape(entry['title']))
            entryString += '},\n'
            entryString += '"slug": {\n'
            entryString += '"en-US": "{0}"\n'.format(slugify(entry['title']))
            entryString += '},\n'
            entryString += '"authors": {\n'
            entryString += '"en-US": [\n'
            for i, author in enumerate(entry['author'].split(' and ')):
                if i+1 == len(entry['author'].split(' and ')):
                    entryString += '"{0}"\n'.format(authorify(author))
                else:
                    entryString += '"{0}",\n'.format(authorify(author))
            entryString += ']\n'
            entryString += '},\n'
            if 'keywords' in entry:
                entryString += '"keywords": {\n'
                entryString += '"en-US": [\n'
                for i, keyword in enumerate(entry['keywords'].split(',')):
                    if i+1 == len(entry['keywords'].split(',')):
                        entryString += '"{0}"\n'.format(unescape(keyword))
                    else:
                        entryString += '"{0}",\n'.format(unescape(keyword))
                entryString += ']\n'
                entryString += '},\n'
            if 'doi' in entry:
                entryString += '"doi": {\n'
                entryString += '"en-US": "{0}"\n'.format(entry['doi'])
                entryString += '},\n'
            entryString += '"year": {\n'
            entryString += '"en-US": "{0}"\n'.format(entry['year'])
            entryString += '}\n'
            entryString += '}\n'
            entryString += '}'
            JSON.append(entryString)
        except:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}. Unknown error.\n'.format(entry['ID']))
                continue
    try:
        for i, entry in enumerate(JSON):
            if i+1 == len(entry):
                f.write(entry)
            else:
                f.write('{0},'.format(entry))
    except:
        with open('errors.txt', 'a') as errors:
            errors.write('Error with entry {0}. Unknown error.\n'.format(entry['ID']))
    f.write(']\n')
    f.write('}')
