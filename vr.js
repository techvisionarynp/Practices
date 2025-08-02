function handleSourceTypeChange() {
    const e = document.getElementById("sourceType").value, t = document.getElementById("linkInput"), n = document.getElementById("fileInput");
    t.style.display = "none", n.style.display = "none", "youtube" === e || "soundcloud" === e ? (t.style.display = "flex",
        document.getElementById("link").required = !0, document.getElementById("file").required = !1) : "file" === e && (n.style.display = "flex",
            document.getElementById("file").required = !0, document.getElementById("link").required = !1);
}

async function handleSubmit(event) {

    event.preventDefault();

    const mode = document.getElementById('chkMixer').value;
    if (mode === "1") {
        const sourceType = document.getElementById('sourceType').value;
        let link = document.getElementById('link').value;
        const file = document.getElementById('file').files[0];
        const clientType = "web"; // Example client type
        const clientName = "Mazmazika"; // Example client name  
        const formData = new FormData();
        formData.append('client-type', clientType);
        formData.append('client-name', clientName);
        const match = link.match(/^https:\/\/youtu\.be\/([\w-]+)(?:\?.*)?$/);
        if (match) {
            link = `https://www.youtube.com/watch?v=${match[1]}`;
        }
        const match2 = link.match(/^https:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=([\w-]+)/);
        if (match2) {
            link = `https://www.youtube.com/watch?v=${match2[1]}`;
        }
        const match3 = link.match(/^https:\/\/(?:www\.|m\.)?youtube\.com\/embed\/([\w-]+)/);
        if (match3) {
            link = `https://www.youtube.com/watch?v=${match3[1]}`;
        }
        if (file && file.size > 31457280) {
            loadingDiv.style.display = 'none';
            alert("Maximum file size exceeded.");
        } else {
            if (sourceType !== 'file') {
                formData.append('url', link);
            } else if (file) {
                formData.append('url', file); // Assume the backend can handle file uploads with the "url" key
            }
            try {
                if (sourceType === 'file') {
                    const loadingDiv = document.getElementById('loadingDiv');
                    if (loadingDiv) {
                        loadingDiv.style.display = 'block'; // Show the loading div
                    } else {
                        console.error("Error: 'loadingDiv' not found!");
                    }

                    // Create a form dynamically
                    const redirectForm = document.createElement('form');
                    redirectForm.method = 'POST';
                    redirectForm.action = 'vocalremover-mixer';
                    redirectForm.enctype = 'multipart/form-data';

                    // Create a file input element and append it to the form
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.name = 'file';
                    redirectForm.appendChild(fileInput);

                    const stemsInput = document.createElement('input');
                    stemsInput.type = 'hidden';
                    stemsInput.name = 'stemsInput';
                    stemsInput.value = document.getElementById('stems').value;
                    redirectForm.appendChild(stemsInput);

                    const sourceInput = document.createElement('input');
                    sourceInput.type = 'hidden';
                    sourceInput.name = 'sourceInput';
                    sourceInput.value = sourceType;
                    redirectForm.appendChild(sourceInput);


                    // Programmatically set the file input value using a FileList
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file); // Add the file object
                    fileInput.files = dataTransfer.files;

                    // Append the form to the body and submit it
                    document.body.appendChild(redirectForm);
                    redirectForm.submit();
                } else {
                    const redirectForm = document.createElement('form');
                    redirectForm.method = 'POST';
                    redirectForm.action = 'vocalremover-mixer';

                    // Add hidden fields for the data you want to send
                    const urlInput = document.createElement('input');
                    urlInput.type = 'hidden';
                    urlInput.name = 'url';
                    urlInput.value = sourceType !== 'file' ? link : file.name;
                    redirectForm.appendChild(urlInput);

                    const stemsInput = document.createElement('input');
                    stemsInput.type = 'hidden';
                    stemsInput.name = 'stemsInput';
                    stemsInput.value = document.getElementById('stems').value;
                    redirectForm.appendChild(stemsInput);

                    const sourceInput = document.createElement('input');
                    sourceInput.type = 'hidden';
                    sourceInput.name = 'sourceInput';
                    sourceInput.value = sourceType;
                    redirectForm.appendChild(sourceInput);


                    document.body.appendChild(redirectForm);
                    redirectForm.submit();
                }

            } catch (error) {

                console.error('Error:', error);
                alert('An error occurred while processing your request. Please try again.');
            } finally {
                // Hide the loading animation after processing is complete

            }
        }
    } else {
        const t = document.getElementById("loadingDiv");
        t.style.display = "block";
        const n = document.getElementById("sourceType").value, l = document.getElementById("stems").value, o = document.getElementById("file").files[0];
        //if (n !== file) alert("We have a problem downloading from youtube and we are working to solve it");
        var d = document.getElementById("link").value;
        const match = d.match(/^https:\/\/youtu\.be\/([\w-]+)(?:\?.*)?$/);

        if (match) {
            d = `https://www.youtube.com/watch?v=${match[1]}`;
        }
        const match2 = d.match(/^https:\/\/(?:www\.|m\.)?youtube\.com\/embed\/([\w-]+)/);
        if (match2) {
            d = `https://www.youtube.com/watch?v=${match2[1]}`;
        }
        const match3 = d.match(/^https:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=([\w-]+)/);
        if (match3) {
            d = `https://www.youtube.com/watch?v=${match3[1]}`;
        }

        const match4 = d.match(/^(https:\/\/soundcloud\.com\/[^\/]+\/[^\/?]+)(?:\?.*)?$/);
        if (match4) {
            d = match4[1]; // Keep just the base URL without query parameters
        }
        // if (o && !["audio/mp3", "audio/wav"].includes(o.type)) {
        //     t.style.display = "none";
        //     alert("Invalid file type. Only MP3 and WAV files are allowed.");
        // } else {
        if (o && o.size > 31457280) t.style.display = "none", alert("Maximum file size exceeded."); else {
            const e = "web", u = "Mazmazika";
            let clientid = localStorage.getItem('clientid');
            if (clientid === null) {
                clientid = generateRandomNumericString();
                localStorage.setItem('clientid', clientid);
            }
            const m = new FormData;
            m.append("stems", l), m.append("client-type", e), m.append("client-name", u);
            var a = "https://www.mazmazika.com/vr2025.php";
            "file" !== n ? m.append("url", d) : o && (a = "https://www.mazmazika.com/vru2025.php",
                m.append("file", o));
            m.append('clientid', clientid);
            try {
                var i = await fetch(a, {
                    method: "POST",
                    body: m
                });
                if (!i.ok) throw new Error("Failed to process the request.");
                for (var r = await i.json(); "queued" === r.filename;) document.getElementById("queued").innerHTML = "There are users ahead in the queue. Please wait for your turn.",
                    await new Promise((e => setTimeout(e, 3e3))), document.getElementById("queued").innerHTML = "",
                    i = await fetch(a, {
                        method: "POST",
                        body: m
                    }), r = await i.json();
                if ("error" !== r.filename) {
                    const e = r.data, t = atob(e), n = new Uint8Array(t.length);
                    for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
                    const l = new Blob([n], {
                        type: "application/zip"
                    }), d = window.URL.createObjectURL(l), o = document.createElement("a");
                    o.href = d, o.download = r.filename, document.body.appendChild(o), o.click(), o.remove(),
                        window.URL.revokeObjectURL(d);
                } else alert(`Error: ${r.data.replace(/\\n/g, "\n")}`);
            } catch (e) {
                console.error("Error:", e);
                if (e.name === "AbortError") {
                    alert("Request timed out. Please check your connection and try again.");
                } else if (e instanceof TypeError) {
                    alert("Network error occurred. Please try again later.");
                } else {
                    alert("An error occurred: " + e.message);
                }
            } finally {
                t.style.display = "none";
            }
        }
        // }
    }

}

document.addEventListener("DOMContentLoaded", (function () {
    document.getElementById("linkInput").style.display = "flex", document.getElementById("link").required = !0,
        document.getElementById("file").required = !1, document.getElementById("sourceType").addEventListener("change", handleSourceTypeChange);
}));
