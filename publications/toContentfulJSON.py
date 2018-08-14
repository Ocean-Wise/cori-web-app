import bibtexparser
from bibtexparser.bibdatabase import BibDatabase
import logging
logging.basicConfig()
logger = logging.getLogger('logger');
import uuid
import re
from slugify import slugify
import json

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
        out = re.sub(r'\{\\textless\}.*?\{\\textgreater\}', '', out)
        out = re.sub(r'\{\\O\}', 'O', out)
        out = re.sub(r"\{\\'\{E\}\}", 'E', out)
        out = re.sub(r"\{\\'\{e\}\}", 'e', out)
        out = re.sub(r"\{\\'\{a\}\}", 'a', out)
        out = re.sub(r"\{\\'\{A\}\}", 'A', out)
        out = re.sub(r"\{\\'\{i\}\}", 'i', out)
        out = re.sub(r"\{\\^\{e\}\}", 'e', out)
        out = re.sub(r"\{\\^\{E\}\}", 'E', out)
        out = re.sub(r"\{\\^\{o\}\}", 'o', out)
        out = re.sub(r"\{\\^\{O\}\}", 'O', out)
        out = re.sub(r"\{\\'\{o\}\}", 'o', out)
        out = re.sub(r"\{\\'\{O\}\}", 'O', out)
        out = re.sub(r"\{\\'\{c\}\}", 'c', out)
        out = re.sub(r"\{\\v\{c\}\}", 'c', out)
        out = re.sub(r"\$.*?\$", '', out)
        # Final catchall to just remove any more BibTex special stuff
        out = re.sub(r'\{.*?\}', '', out)
        # Now actually escape things we want escaped in json
        out = re.sub(r'\"', '\\"', out)
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

with open('All.bib') as f:
    bibtex = bibtexparser.load(f)

with open('import.json', 'w') as f:
    f.write('{\n')
    f.write('"entries": [\n')
    # Loop
    for entry in bibtex.entries:
        # print(entry['title'])
        if re.match(r'eanniard', entry['author']):
            with open('errors.txt', 'a') as errors:
                errors.write('Silly author in entry {0}\n'.format(entry['ID']))
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
            f.write('{\n')
            f.write('"sys": {\n')
            if 'ID' in entry:
                f.write('"id": "{0}",\n'.format(''.join(e for e in entry['ID'] if e.isalnum())))
            else:
                f.write('"id": "{0}",\n'.format(uuid.uuid4()))
            f.write('"publishedVersion": 1,\n')
            f.write('"contentType": {\n')
            f.write('"sys": {\n')
            f.write('"type": "Link",\n')
            f.write('"linkType": "ContentType",\n')
            f.write('"id": "researchPapers"\n')
            f.write('}\n')
            f.write('}\n')
            f.write('},\n')
            f.write('"fields": {\n')
            f.write('"citation": {\n')
            f.write('"en-US": {0}\n'.format(citationString))
            f.write('},\n')
            if 'abstract' in entry:
                abstract = unescape(entry['abstract'])
                f.write('"abstract": {\n')
                try:
                    f.write('"en-US": "{0}"\n'.format(abstract))
                except:
                    f.write('"en-US": "THIS NEEDS TO BE FIXED"\n')
                    with open('errors.txt', 'a') as errors:
                        errors.write('Error with entry {0}, at index {1}. Need to add abstract...\n'.format(entry['ID'], i))
                        errors.write('\n')
                f.write('},\n')
            if 'url' in entry:
                if (len(entry['url'].split(' ')) > 1):
                    url = unescape(entry['url'].split(' ')[0])
                else:
                    url = unescape(entry['url'])
                f.write('"url": {\n')
                f.write('"en-US": "{0}"\n'.format(url))
                f.write('},\n')
            f.write('"title": {\n')
            f.write('"en-US": "{0}"\n'.format(unescape(entry['title'])))
            f.write('},\n')
            f.write('"slug": {\n')
            f.write('"en-US": "{0}"\n'.format(slugify(entry['title'])))
            f.write('},\n')
            f.write('"authors": {\n')
            f.write('"en-US": [\n')
            for i, author in enumerate(entry['author'].split(' and ')):
                if i+1 == len(entry['author'].split(' and ')):
                    f.write('"{0}"\n'.format(authorify(author)))
                else:
                    f.write('"{0}",\n'.format(authorify(author)))
            f.write(']\n')
            f.write('},\n')
            # ERROR IN KEYWORDS!!
            if 'keywords' in entry:
                f.write('"keywords": {\n')
                f.write('"en-US": [\n')
                for i, keyword in enumerate(entry['keywords'].split(',')):
                    # print('{0}\n'.format(keyword))
                    if i+1 == len(entry['keywords'].split(',')):
                        f.write('"{0}"\n'.format(unescape(keyword)))
                    else:
                        f.write('"{0}",\n'.format(unescape(keyword)))
                f.write(']\n')
                f.write('},\n')
            if 'doi' in entry:
                f.write('"doi": {\n')
                f.write('"en-US": "{0}"\n'.format(entry['doi']))
                f.write('},\n')
            f.write('"year": {\n')
            f.write('"en-US": "{0}"\n'.format(entry['year']))
            f.write('}\n')
            f.write('}\n')
            f.write('},\n')
        except:
            with open('errors.txt', 'a') as errors:
                errors.write('Error with entry {0}. Unknown error.\n'.format(entry['ID']))
                continue
    f.write(']\n')
    f.write('}')
