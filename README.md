# Jcink Notepad Anywhere
A script for making the UCP notepad available anywhere on a jcink forum.
Due to jcink not allowed fetch requests to the domain from external domains, this script MUST be written inline via <script> tags OR hosted locally on your jcink forum (e.g. <script src="yourForum.jcink.net/script.js">). It cannot be implemented via CDN.
  
# How to use?
- Copy the script to your forum wrapper. 
- On your forum, create an element with id="notepadWrapper". 
The notepad from UCP will be copied AS IS into there. 
- If you do not need/want the Notepad size selector, on line 94 
change `createNotepad({ sizeSelector: true });` 
to `createNotepad({ sizeSelector: false });`
- For styling purposes, here are the recommended selectors to target:  
  - `#notepadWrapper form` for managing form layout
  - `#notepadWrapper [name="notes"]` for managing large textArea
  - `#notepadWrapper [type="submit"]` for managing submit button
