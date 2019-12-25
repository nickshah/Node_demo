#!/usr/bin/env bash

folder_name="$1"

cd "images"

if [ -d "$folder_name" ]; then
  echo "Prsent"
  else
   mkdir $folder_name
   cd $folder_name
   mkdir Creatives
   mkdir Events
fi

