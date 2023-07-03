showNotes();
let addNote = document.getElementById('addNote');
addNote.addEventListener('click',()=> {
    let addTitle = document.getElementById('addTitle');
    let addDesc = document.getElementById('addDesc');
    let isImportant = document.getElementById('important');
    
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if(addTitle.value != "" && addDesc.value != ""){
        if(isImportant.checked){
            isImportant.value = "important";
            isImportant.setAttribute('checked','')
        } else {
            isImportant.value = "";
            isImportant.removeAttribute('checked');
        }
        titleText = addTitle.value.toString();
        titleText = titleText.replaceAll(`'`,`\'`);
        titleText = titleText.replaceAll(`"`,`\"`);
        titleText = titleText.replaceAll(`<`,`&lt;`);
        titleText = titleText.replaceAll(`>`,`&gt;`);

        descText = addDesc.value.toString();
        descText = descText.replaceAll(`'`,`\'`);
        descText = descText.replaceAll(`"`,`\"`);
        descText = descText.replaceAll(`<`,`&lt;`);
        descText = descText.replaceAll(`>`,`&gt;`);

        let myObj = {
            title: titleText,
            note: descText,
            status: isImportant.value
        };
        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTitle.value = "";
        addDesc.value = "";
    }
    isImportant.removeAttribute('checked');
    showNotes();
})
function showNotes(){
    let notes = localStorage.getItem('notes');
    let noteArea = document.querySelector('.notesSection .row');
    let noteCols = ``;
    if(notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function(element, index) {
        if(element.note.length > 70){
            elemNote = `${element.note.slice(0,70)}...<span onclick="readMore(${index},'${element.note}')" class="readMore"> Read more</span>`;
        } else {
            elemNote = `${element.note}`;
        }
        
        noteCols += `<div class="col-md-4 my-2 noteCol">
        <div class="card  ${element.status}">
        <div class="card-body">
        <h4 class="card-itle noteTitle" id="noteTitle-${index}">${element.title}</h4>
        <p class="card-text noteDesc" id="note-${index}">` + `
        
        ${elemNote}
        
        ` + `
        </p>
        <button type="button" onclick="deleteNote(${index})" class="btn btn-primary" id="delNote">Delete Note</button>
        <button type="button" onclick="editNote(${index},'${element.title}','${element.note}')" class="btn btn-primary" id="editNote">Edit Note</button>
        </div>
        </div>
        </div>`;
    });
    if(noteCols == ""){
        noteArea.innerHTML = `<div class="col my-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-itle">No notes available. Please add a Note.</h4>
                                    </div>
                                </div>
                            </div>`;
    } else {
        noteArea.innerHTML = noteCols;
    }
}



function readMore(id,text){
    let noteDesc = document.getElementById(`note-${id}`);
    noteDesc.innerText = text;
}




function deleteNote(id){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(id,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById('searchTxt');
    search.addEventListener('input', ()=>{
        let inputVal = search.value;
        inputVal = inputVal.toLowerCase();
        let noteCard = document.getElementsByClassName('noteCol');
        Array.from(noteCard).forEach(element => {
            let titleText = element.querySelector('.noteTitle').innerText;
            let noteText = element.querySelector('.noteDesc').innerText;
            titleText = titleText.toLowerCase();
            noteText = noteText.toLowerCase();
            if(titleText.includes(inputVal) || noteText.includes(inputVal)){
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
})
function editNote(id,title,note){
    let titleText = document.getElementById(`noteTitle-${id}`);
    let noteText = document.getElementById(`note-${id}`);

    titleText.innerHTML = `<input type="text" class="form-control" name="title" id="editTitle" value="${title}">`;
    noteText.innerHTML = `<textarea class="form-control" name="desc" rows="3" style="resize: vertical;">${note}</textarea>`;

    let input = titleText.getElementsByTagName('input');
    let textarea = noteText.getElementsByTagName('textarea');
    input[0].addEventListener('blur',()=>{
        let newTitle = input[0].value;
        titleText.innerHTML = newTitle;
        let notes = localStorage.getItem('notes');
        notesObj = JSON.parse(notes);
        notesObj[id].title = newTitle;
        localStorage.setItem('notes', JSON.stringify(notesObj));
        
    });
    textarea[0].addEventListener('blur',()=>{
        let newNote = textarea[0].value;
        noteText.innerHTML = newNote;
        let notes = localStorage.getItem('notes');
        notesObj = JSON.parse(notes);
        notesObj[id].note = newNote;
        localStorage.setItem('notes', JSON.stringify(notesObj));
    });
}
