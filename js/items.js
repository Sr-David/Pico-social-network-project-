const items = db.collection("items");
const categories = db.collection("categories");

function addItem(doc) {
    add(items, doc)
        .then(() => {
            loadItems();

            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";

            showAlert("Element guardat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar guardar l'element", "alert-danger");
        });
}

function deleteItem(id) {
    deleteById(items, id)
        .then(() => {
            loadItems();
            showAlert("Element eliminat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al intentar eliminar l'element", "alert-danger");
        });
}

function editItem(id) {
    document.getElementById("elementId").value = id;
    document.getElementById("thumbnail").style.visibility = "visible";
    selectById(items, id)
        .then((doc) => {
            document.getElementById("title").value = doc.data().title;
            document.getElementById("content").value = doc.data().content;
            document.getElementById("thumbnail").src = doc.data().image;
        })
        .catch(() => {
            showAlert("Error al intentar editar l'element", "alert-danger");
        });
}

function loadItems() {
    selectAll(items)
    // selectAll(items, "title")
    // selectWhere(items, "title", "==", "Firma")
    // selectLike(items, "title", "F")
        .then((arrayItems) => {
            document.getElementById("listItems").innerHTML = `<tr>
																<th></th>
																<th>Títol</th>
																<th>Contingut</th>
																<th></th>
															</tr>`;
            arrayItems.forEach((docItem) => {
                let image = "";
                if (docItem.data().image != null) {
                    image = `<img src="${docItem.data().image}" class="rounded" style="max-width: 100px; max-height: 100px;" "alt="${docItem.data().title}">`;
                }
                selectById(categories, docItem.data().category.id)
                    .then((docCategory) => {
                        document.getElementById("listItems").innerHTML += `<tr>
                                                                        <td>${image}</td>
                                                                        <td>${docItem.data().title} - ${docCategory.data().name}</td>
                                                                        <td>${docItem.data().content}</td>
                                                                        <td>
                                                                            <button type="button" class="btn btn-danger float-right" onclick="eliminar('${docItem.id}', '${docItem.data().image}')">
                                                                                Eliminar
                                                                            </button>
                                                                            <button type="button" class="btn btn-primary mr-2 float-right" onclick="editItem('${docItem.id}')">
                                                                                Editar
                                                                            </button>
                                                                        </td>
                                                                    </tr>`;
                    })
                    .catch(() => {
                        showAlert("Error al mostrar els elements", "alert-danger");
                    });
            });
        })
        .catch(() => {
            showAlert("Error al mostrar els elements", "alert-danger");
        });
}

function updateItem(id, doc) {
    updateById(items, id, doc)
        .then(() => {
            loadItems();

            document.getElementById("elementId").value = "";
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";
            document.getElementById("thumbnail").style.visibility = "hidden";

            showAlert("Element actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat l'element", "alert-danger");
        });
}