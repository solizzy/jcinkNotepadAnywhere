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
  - `#notepadWrapper np-status` for managing status text

# Features
- Guests without notepads will simply see an error message: *You must be logged in to see your notepad!* This can be edited on line 89.
- Updating will **not** redirect, unlike in UCP. Instead, a status text will appear (updating... / updated!)
- If using the size selector, size of notepad will change when selecting the appropriate option. The size will not be saved unless user clicks update. This does NOT affect the width of the textarea if the user has edited it via the resizer.
- The UCP notepad and this notepad are always in sync! Notes are only updated after hitting the 'update' button, as its done in UCP.

# Changelog 
(version number, dd/mm/yy)

v1.0.0, 07/04/21
- The first iteration is complete!

v1.1.0, 07/04/21
- Removed jquery dependency by fixing post request to fetch, rather than $.ajax!
- Added the ability to remove the sizeSelector. By default it matches the behavior of og version (it does not remove the selector).
- Added status text to provide feedback to users when clicking the update button. No more wondering if it worked!
- The notepadCreation function will now only run after the DOM is loaded, so it doesn't matter if the script is in <head> or at the end of the wrapper.
- Broke down the function into legible chunks for anyone that wants to read through my code and understand how it works (if you have questions, feel free to ask!) .
