import Swal from 'sweetalert2';

export const errorWithoutBtn = (title, text) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000
  });
}

export const successWithoutBtn = (title, text, cb) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000
  }).then(() => cb())
}

export const warningWithoutBtn = (title, text) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000
  })
}