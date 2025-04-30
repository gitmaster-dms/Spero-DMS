#!/bin/bash
if [ -d "vvenv" ] 
then
    echo "Python virtual environment exists." 
else
    python3 -m venv vvenv
fi
echo $PWD
source vvenv/bin/activate
echo "Python vvenv activated"

echo "Installing current dependancies - pip3 install -r requirnment.txt"
pip3 install -r requirnment.txt

echo "myenv setup finishes"