import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";


const FileModal = (props) => {
    const [file, setFile] = useState([]);

    //choose file
    const addFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFile(file)

        }
        else {
            return false
        }


    }

    //send File
    const sendFile = () => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const metaData = { content: file.name }
            return props.uploadFile(file, metaData)
        }

    }



    return (
        <Modal basic open={props.modal} onClose={props.closeModal}>
            <Modal.Header>Select an Image File</Modal.Header>
            <Modal.Content>
                <Input
                    onChange={addFile}
                    fluid
                    label="File types: jpg, png"
                    name="file"
                    type="file"

                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={sendFile}>
                    <Icon name="checkmark" /> Send
      </Button>
                <Button color="red" inverted onClick={props.closeModal}>
                    <Icon name="remove" /> Cancel
      </Button>
            </Modal.Actions>
        </Modal>)

}

export default FileModal