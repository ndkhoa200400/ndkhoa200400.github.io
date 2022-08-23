#!/bin/sh
yarn run build
src_dir=./build/
des_dir=../ZPaymentConfig
mv $src_dir/static/* 
rsync -auvr $src_dir $des_dir/src/main/resources/static/
rsync -auvr $src_dir/index.html $des_dir/src/main/resources/templates/home/
