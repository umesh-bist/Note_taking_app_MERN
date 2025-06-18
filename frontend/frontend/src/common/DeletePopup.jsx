import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Trash2 } from 'lucide-react';

const DeletePopup = ({ onDelete }) => {
  const MySwal = withReactContent(Swal);

  const handleDelete = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      width:400,
      height:50,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();

        // MySwal.fire({
        //   icon: 'success',
        //   title: 'Deleted!',
        //   text: 'Your note has been deleted successfully.',
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
      }
    });
  };

  return (
   <button 
  onClick={handleDelete}
  className="rounded"
>
  <Trash2 className="w-4 h-4 hover:scale-130" />
</button>

  );
};

export default DeletePopup;
