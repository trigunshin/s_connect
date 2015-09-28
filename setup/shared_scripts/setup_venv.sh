#!/bin/bash
virtualenv virt
sourve virt/bin/activate
pip install -r requirements.txt
pip install --allow-external mysql-connector-python mysql-connector-python