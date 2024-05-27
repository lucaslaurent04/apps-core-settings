#!/bin/bash
cp -r version ../version && cp -r web.app ../web.app && cp -r manifest.json ../manifest.json
rm -rf ../../../../../public/settings && mkdir ../../../../../public/settings && cp -a dist/symbiose/* ../../../../../public/settings/