import { useDispatch, useSelector } from "react-redux";
import { addMedicine, deleteMedicine } from "../features/medicineSlice";
import { logout } from "../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const medicines = useSelector(
    state => state.medicine.medicines || []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 2;

  if (!user) {
    return <Navigate to="/" />;
  }

  // 🔹 Filter medicines by user + search
  const filteredMedicines = medicines.filter(
    m =>
      m.username === user.username &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination logic
  const totalPages = Math.ceil(
    filteredMedicines.length / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 🔹 Add medicine
  const handleAdd = () => {
    if (!name || !stock) {
      alert("Enter medicine name and stock");
      return;
    }

    if (filteredMedicines.length >= 5) {
      alert("Only 5 medicines allowed");
      return;
    }

    dispatch(
      addMedicine({
        id: Date.now(),
        username: user.username,
        name,
        stock,
        time: new Date().toLocaleString()
      })
    );

    setName("");
    setStock("");
  };

  // 🔹 Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <h2>Medical Store Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Add Medicine</h3>
      <input
        placeholder="Medicine Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <hr />

      <h3>Search</h3>
      <input
        placeholder="Search medicine"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1); // reset pagination on search
        }}
      />

      <hr />

      <h3>Medicine List</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentMedicines.length === 0 ? (
            <tr>
              <td colSpan="4">No medicines found</td>
            </tr>
          ) : (
            currentMedicines.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.stock}</td>
                <td>{m.time}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${m.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(deleteMedicine(m.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      {/* 🔹 Pagination buttons */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span> Page {page} of {totalPages || 1} </span>

      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
}

export default Dashboard;
