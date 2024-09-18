import React, { useState } from 'react';

const mahasiswaList = Array.from({ length: 10 }, (_, i) => `mahasiswa_${i + 1}`);
const aspekList = Array.from({ length: 10 }, (_, i) => `aspek_penilaian_${i + 1}`);

const App = () => {
  // State untuk menyimpan penilaian
  const [penilaian, setPenilaian] = useState(() =>
    aspekList.reduce((acc, aspek) => {
      acc[aspek] = mahasiswaList.reduce((mhsAcc, mahasiswa) => {
        mhsAcc[mahasiswa] = 1; 
        return mhsAcc;
      }, {});
      return acc;
    }, {})
  );

  // Handler untuk mengubah nilai penilaian
  const handleChange = (aspek, mahasiswa, value) => {
    const newValue = Number(value);

    // Validasi nilai agar tidak kurang dari 1 dan tidak lebih dari 10
    if (newValue < 1 || newValue > 10) {
      alert('Nilai harus di antara 1 dan 10');
      return;
    }

    // Memperbarui state penilaian jika nilai valid
    setPenilaian((prev) => ({
      ...prev,
      [aspek]: {
        ...prev[aspek],
        [mahasiswa]: newValue,
      },
    }));
  };

  // Handler untuk menyimpan data penilaian
  const handleSave = () => {
    console.log(JSON.stringify(penilaian, null, 2));
    alert('Penilaian berhasil disimpan! Lihat hasil di console.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Form Penilaian Mahasiswa</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Mahasiswa</th>
            {aspekList.map((aspek, id) => (
              <th key={id}>{`Aspek ${id + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map((mahasiswa, idMhs) => (
            <tr key={idMhs}>
              <td>{`Mahasiswa ${idMhs + 1}`}</td>
              {aspekList.map((aspek, idAsp) => (
                <td key={idAsp}>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={penilaian[aspek][mahasiswa]}
                    onChange={(e) => handleChange(aspek, mahasiswa, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Simpan</button>
    </div>
  );
};

export default App;
