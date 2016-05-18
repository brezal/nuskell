#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

with open('README.md') as f:
  readme = f.read()

with open('LICENSE') as f:
  license = f.read()

# Dynamically figure out the version
version = __import__('nuskell').__version__

setup(
    name='nuskell',
    version=version,
    description='DNA strand displacement compiler (CRN <=> DOM)',
    long_description=readme,
    author='Seung Woo Shin, ...',
    author_email='somebody@caltech.edu',
    #url='http://www.dna.caltech.edu/nuskell/',
    license=license,
    install_requires=['pyparsing>=1.5.5', 'argparse>=1.2.1', 'peppercorn==0.4.0'],
    packages=['nuskell', 'nuskell.parser', 'nuskell.interpreter', 
      'nuskell.include', 'nuskell.include.DNAObjects', # remove these dependencies
      'nuskell.verifier'],
    scripts=['scripts/nuskell']
)

