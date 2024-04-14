import React, { useState } from "react";
import styles from "./modal.module.css";
import { Box, Modal, Typography } from "@mui/material";

interface IModalProps {
  text: string;
  open: boolean;
}

const CustomModal: React.FC<IModalProps> = ({ text, open }: IModalProps) => {
  const [isOpened, setIsOpened] = useState(open);

  const handleClose = () => setIsOpened(false);

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {text}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Modal content
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;
