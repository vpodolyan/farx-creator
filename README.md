# farx-creator
This tool creates Fiddler auto-response rules massively based on files in certain directory 

## Usage

To generate auto-response rules simple use ```./create-farx``` passing a directory and url as parameters. Following example maps all js files in current directory to corresponding files on http://test.com URL
```shell
./create-farx ./ http://test.com/
```

You can add files from subdirectories passing ```-r``` as third parameter
```shell
./create-farx ./sample http://test.com/ -r
```
