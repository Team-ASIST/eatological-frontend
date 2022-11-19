# Folder Structure

## ```pages```
 The ```pages``` folder should contain one folder for each page in the application. Inside of those page specific folders should be a single root file that is your page (generally index.ts) alongside all the files that are only applicable to that page. 
This separation of page specific code from your more general global code is the biggest benefit of this folder structure. 

## ```components```
The ```components``` folder is currently broken down into two subfolders. These subfolders are really useful since they help keep the components organized into different sections instead of just being one massive blob of components. We have an ui folder which contains all our UI components like buttons, modals, cards, etc. We also have a form folder for form specific controls like checkboxes, inputs, date pickers, etc.


## ```hooks```
The hooks folder stores only the global hooks that are used across multiple pages. This is because all page specific hooks are stored in the pages folder. This is a useful folder to have in any size project since almost every project will have multiple custom hooks so having a single place to put them all is really useful.#

## ```assets```
The assets folder contains all images, css files, font files, etc. for the project. Pretty much anything that isn't code related will be stored in this folder.


## ```context```
The context folder stores all your React context files that are used across multiple pages. I find on larger projects you will have multiple context you use across your application and having a single folder to store them is really useful. In our project we use a Redux-Setup. Therefore all files that are related to the Redux-Store are saved here. 

## ```data```
The data folder is similar to the assets folder, but this is for storing our data assets such as JSON files that contain information used in our code (store items, theme information, etc). This folder can also store a file that contains global constant variables. This is useful when you have lots of constants you use across your application, such as environment variables.

## ```utils```
The final new folder is the utils folder. This folder is for storing all utility functions such as formatters. This is a pretty straightforward folder and all the files in this folder should likewise be straightforward.

## ```__tests__```
Every folder contains one ```__tests__``` folder for storing all the necessary test cases of all files stored in the folder. 

# Coding conventions

In Expo projects, eslint and prettier are doesn’t configured by default. So we need to configure ourselves. For this reason, Expo team made a package named eslint-config-universe to configure these tools.
