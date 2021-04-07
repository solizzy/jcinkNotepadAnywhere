(async function getNotepad() {
  const wrapper = document.querySelector("#notepadWrapper");
  const response = await fetch("/index.php?act=UserCP&CODE=00");
  const textHTML = await response.text();
  const ucp = new DOMParser().parseFromString(textHTML, "text/html");
  const notepad = ucp.querySelector('form[name="notepad"]');

  if (notepad !== null) {
    notepad.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const notes = formData.get("notes");
      $.ajax({
        type: "POST",
        data: {
          act: "UserCP",
          CODE: "20",
          notes: notes,
        },
        url: "/index.php?",
      });
    });

    notepad.querySelector(`[name="ta_size"]`).addEventListener("change", (event) => {
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
        notepad.querySelector(`[name="notes"]`).style = "";
      });

    wrapper.appendChild(notepad);
  } else {
    wrapper.textContent = "You must be logged in to see your notepad!";
  }
})();