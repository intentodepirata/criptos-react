import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectMonedas from "./SelectMonedas";
import SelectCripto from "./SelectCripto";

const Formulario = ({ setMonedas }) => {
  const [moneda, setMoneda] = useState(null);
  const [cripto, setCripto] = useState(null);
  const [optionsApi, setOptionsApi] = useState(null);
  const [response, setResponse] = useState(null);

  const [error, setError] = useState(false);
  const options = [
    { id: "EUR", nombre: "Euro" },
    { id: "USD", nombre: "Dolar Estados Unidos" },
    { id: "GPB", nombre: "Libra Esterlina" },
    { id: "MXN", nombre: "Peso Mexicano" },
  ];

  useEffect(() => {
    const llamadaApi = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD`;
      const response = await fetch(url);
      const data = await response.json();
      const arrayCriptos = data.Data.map((cripto) => {
        const objeto = {
          name: cripto.CoinInfo.FullName,
          id: cripto.CoinInfo.Name,
        };
        return objeto;
      });
      setResponse(data.Data);
      setOptionsApi(arrayCriptos);
    };
    llamadaApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!moneda || !cripto) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setMonedas({ moneda, cripto });
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <SelectMonedas
        label={"Elije tu moneda"}
        options={options}
        setMoneda={setMoneda}
        error={error}
      />
      <SelectCripto
        label={"Elije tu Criptomoneda"}
        optionsApi={optionsApi}
        setCripto={setCripto}
        error={error}
      />
      <Button
        sx={{
          width: "100%",
          fontWeight: "700",
          fontSize: "20px",
        }}
        size="large"
        type="submit"
        variant="contained"
        color="primary"
      >
        Consultar
      </Button>
    </Box>
  );
};

export default Formulario;
