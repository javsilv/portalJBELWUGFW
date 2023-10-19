function buscarRegistroPorNombreTable() {
  const database = firebase.database();

  const campoABuscar = document.getElementById("registroId").value;

  if (!campoABuscar) {
    alert("Por favor, ingresa un nombre para buscar.");
    return;
  }

  const tablaRegistros = document.getElementById("tablaRegistros");
  const registrosRef = database.ref("/");

  registrosRef
    .orderByChild("nombre")
    .equalTo(campoABuscar)
    .once("value", (snapshot) => {
      const registros = snapshot.val();

      tablaRegistros.innerHTML = "";

      if (registros) {
        Object.keys(registros).forEach((registroId) => {
          const registro = registros[registroId];
          const fila = document.createElement("tr");
          fila.innerHTML = `
          <td>${registroId}</td>
          <td>${registro.nombre}</td>
          <td>${registro.fecha}</td>
          <td>${registro.marcador[0]}</td>
          <td>${registro.marcador[1]}</td>
          <td>${registro.marcador[2]}</td>
          <td>${registro.marcador[3]}</td>
          <td>${registro.marcador[4]}</td>
          <td>${registro.marcador[5]}</td>
          <td>${registro.marcador[6]}</td>
          <td>${registro.marcador[7]}</td>
          <td>${registro.marcador[8]}</td>
            <!-- Agrega más columnas según tus datos -->
            <td>${
              registro.status
                ? `<button onclick="CancelarPorNombre('${registroId}')"><img src="https://javsilv.github.io/portalJBELWUGFW/img/aprobado.png" alt="Image for True"></button>`
                : `<button onclick="AprobarQuinielaPorNombre('${registroId}')"><img src="https://javsilv.github.io/portalJBELWUGFW/img/espera.png" alt="Image for False"></button>`
            }</td>
          `;
          tablaRegistros.appendChild(fila);
        });
      } else {
        tablaRegistros.innerHTML =
          '<tr><td colspan="4">No se encontraron registros.</td></tr>';
      }
    });
}

function buscarRegistroPorId() {
  const database = firebase.database();

  const registroId = document.getElementById("registroId").value;

  if (!registroId) {
    alert("Por favor, ingresa un ID para buscar.");
    return;
  }

  const tablaRegistros = document.getElementById("tablaRegistros");
  const registrosRef = database.ref("/");

  registrosRef.child(registroId).once("value", (snapshot) => {
    const registro = snapshot.val();
    tablaRegistros.innerHTML = "";

    if (registro) {
      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td>${registroId}</td>
          <td>${registro.nombre}</td>
          <td>${registro.fecha}</td>
          <td>${registro.marcador[0]}</td>
          <td>${registro.marcador[1]}</td>
          <td>${registro.marcador[2]}</td>
          <td>${registro.marcador[3]}</td>
          <td>${registro.marcador[4]}</td>
          <td>${registro.marcador[5]}</td>
          <td>${registro.marcador[6]}</td>
          <td>${registro.marcador[7]}</td>
          <td>${registro.marcador[8]}</td>
          <td>${
            registro.status
              ? `<button onclick="Cancelar('${registroId}')"><img src="/img/aprobado.png" alt="Image for True"></button>`
              : `<button onclick="AprobarQuiniela('${registroId}')"><img src="/img/espera.png" alt="Image for False"></button>`
          }</td>
          <!-- Agrega más columnas según tus datos -->
        `;
      tablaRegistros.appendChild(fila);
    } else {
      tablaRegistros.innerHTML =
        '<tr><td colspan="3">No se encontró el registro.</td></tr>';
    }
  });
}

function AprobarQuiniela(registroId) {
  const database = firebase.database();

  const nuevosDatos = {
    status: true,
  };

  const usuarioRef = database.ref("/" + registroId);
  usuarioRef
    .update(nuevosDatos)
    .then(() => {
      console.log("Actualizacion con éxito.");
    })
    .catch((error) => {
      console.error("Error al actualizar registro:", error);
    });

  buscarRegistroPorId();
}

function Cancelar(registroId) {
  const database = firebase.database();

  const nuevosDatos = {
    status: false,
  };

  const usuarioRef = database.ref("/" + registroId);
  usuarioRef
    .update(nuevosDatos)
    .then(() => {
      console.log("Actualizacion con éxito.");
    })
    .catch((error) => {
      console.error("Error al actualizar registro:", error);
    });

  buscarRegistroPorId();
}

function AprobarQuinielaPorNombre(registroId) {
  const database = firebase.database();

  const nuevosDatos = {
    status: true,
  };

  const usuarioRef = database.ref("/" + registroId);
  usuarioRef
    .update(nuevosDatos)
    .then(() => {
      console.log("Actualizacion con éxito.");
    })
    .catch((error) => {
      console.error("Error al actualizar registro:", error);
    });

  buscarRegistroPorNombreTable();
}

function CancelarPorNombre(registroId) {
  const database = firebase.database();

  const nuevosDatos = {
    status: false,
  };

  const usuarioRef = database.ref("/" + registroId);
  usuarioRef
    .update(nuevosDatos)
    .then(() => {
      console.log("Actualizacion con éxito.");
    })
    .catch((error) => {
      console.error("Error al actualizar registro:", error);
    });

  buscarRegistroPorNombreTable();
}

function downloadData() {
  const database = firebase.database();
  const ref = database.ref("/");

  ref
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      const jsonData = JSON.stringify(data, null, 2);

      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "datos.json"; // Nombre del archivo JSON
      a.click();
    })
    .catch((error) => {
      console.error("Error al exportar datos: ", error);
    });
}

function downloadPaid() {
  const database = firebase.database();
  const ref = database.ref("/");
  const query = ref.orderByChild("status").equalTo(true);

  query
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();

      if (data) {
        console.log(data);

        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datos.json"; // Nombre del archivo JSON
        a.click();
      } else {
        console.log("No se encontraron registros con status=true");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los registros: ", error);
    });
}

function downloadPaidEspecif() {
  const database = firebase.database();
  const ref = database.ref("/");
  const query = ref.orderByChild("status").equalTo(true);

  query
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      const formattedData = {};

      if (data) {
        console.log(data);

        Object.keys(data).forEach((key) => {
          const { nombre, marcador } = data[key];
          formattedData[key] = { nombre, marcador };
        });

        const jsonData = JSON.stringify(formattedData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datos.json"; // Nombre del archivo JSON
        a.click();
      } else {
        console.log("No se encontraron registros con status=true");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los registros: ", error);
    });
}

function downloadPaidEspecifExcel() {
  const database = firebase.database();
  const ref = database.ref("/");
  const query = ref.orderByChild("status").equalTo(true);

  query
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = [];

        // Convierte los datos en un formato adecuado para Excel
        Object.keys(data).forEach((key) => {
          const { nombre, marcador } = data[key];
          formattedData.push([key, nombre, ...marcador]);
        });

        // Crea un objeto de Excel
        const ws = XLSX.utils.aoa_to_sheet([
          [
            "ID",
            "Nombre",
            "Marcador1",
            "Marcador2",
            "Marcador3",
            "Marcador4",
            "Marcador5",
            "Marcador6",
            "Marcador7",
            "Marcador8",
            "Marcador9",
          ],
          ...formattedData,
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Convierte el objeto de Excel en un ArrayBuffer
        const excelData = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Crea una URL para el archivo Excel
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datos.xlsx"; // Nombre del archivo Excel
        a.click();
      } else {
        console.log("No se encontraron registros con status=true");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los registros: ", error);
    });
}
