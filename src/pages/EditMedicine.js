import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicine } from "../features/medicineSlice";
import { useState } from "react";

function EditMedicine() {
  const { id } = useParams(); // string
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 FIX: convert id to Number
  const medicine = useSelector(state =>
    state.medicine.medicines.find(
      m => m.id === Number(id)
    )
  );

  // 🔒 Safety check
  if (!medicine) {
    return <h3>Medicine not found</h3>;
  }

  const [name, setName] = useState(medicine.name);
  const [stock, setStock] = useState(medicine.stock);

  const handleUpdate = () => {
    dispatch(
      updateMedicine({
        ...medicine,
        name: name,
        stock: stock
      })
    );

    navigate("/dashboard"); // 🔥 go back
  };

  return (
    <>
      <h2>Edit Medicine</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </>
  );
}

export default EditMedicine;
