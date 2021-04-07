/* Jcink Notepad Anywhere v1.1.0  (https://github.com/solizzy/jcinkNotepadAnywhere) */

async function createNotepad({ sizeSelector = true }) {
  const wrapper = document.querySelector("#notepadWrapper");

  if (wrapper === null) {
    console.error("No element with id='notepadWrapper'");
    return;
  }

  const response = await fetch("/index.php?act=UserCP&CODE=00");
  const textHTML = await response.text();
  const ucp = new DOMParser().parseFromString(textHTML, "text/html");
  const notepad = ucp.querySelector('form[name="notepad"]');
  statusEl = document.createElement("np-status");
  notepad
    .querySelector("input[type='submit']")
    .insertAdjacentElement("afterend", statusEl);

  function handleNotepadUpdate(notepad) {
    notepad.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new URLSearchParams(new FormData(event.target));

      let statusEl = notepad.querySelector("np-status");

      statusEl.textContent = "Updating...";

      try {
        const response = await fetch("/index.php?", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: formData,
        });

        if (response.ok) {
          statusEl.textContent = "Updated!";
        }
      } catch (error) {
        statusEl.textContent = "There was an error saving, please try again.";
      }
    });
  }

  function handleSizeChange(notepad) {
    notepad
      .querySelector(`[name="ta_size"]`)
      .addEventListener("change", (event) => {
        const size = event.target.value;
        let rowSize;
        switch (size) {
          case "s":
            rowSize = 5;
            break;

          case "m":
            rowSize = 7;
            break;

          case "l":
            rowSize = 15;
            break;
        }
        notepad.querySelector(`[name="notes"]`).rows = rowSize;
        notepad.querySelector(`[name="notes"]`).style.height = "";
      });
  }

  function removeSizeSelector(notepad) {
    const inputEl = notepad.querySelector('[name="ta_size"]');
    inputEl.previousSibling.remove();
    inputEl.nextSibling.remove();
    inputEl.remove();
  }

  if (notepad !== null) {
    handleNotepadUpdate(notepad);

    if (sizeSelector) {
      handleSizeChange(notepad);
    } else {
      removeSizeSelector(notepad);
    }

    wrapper.appendChild(notepad);
  } else {
    wrapper.textContent = "You must be logged in to see your notepad!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createNotepad({ sizeSelector: true });
});
