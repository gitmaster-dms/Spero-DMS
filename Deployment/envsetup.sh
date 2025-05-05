#!/bin/bash
if [ -d "vvenv" ] 
then
    echo "Python virtual environment exists." 
else
    python3 -m venv vvenv
fi
echo $PWD
(
    source vvenv/bin/activate
    echo "Python vvenv activated"
    # echo "Installing current dependencies - pip install -r requirnment.txt"
    # pip install -r requirnment.txt
)

echo "vvenv setup finishes"