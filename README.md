# farx-creator
This tool creates Fiddler auto-response rules massively based on files in certain directory 

## Usage

To generate auto-response rules simple use ```./create-farx``` passing a directory and url as parameters. Following example maps all js files in current directory to corresponding files on http://test.com URL
```shell
./create-farx ./ http://test.com/
```
