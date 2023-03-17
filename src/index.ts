import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const jogos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

interface IOpcao {
  opcao: number;
  player: '' | 'X' | 'O';
}

app.post('/verifica-Jogo', (req, res) => {
  const opcoes: IOpcao[] = req.body;

  console.log(opcoes);

  let vencedor = '';
  let empate = false;

  const opcoesX = opcoes.filter((opcao) => opcao.player === 'X').map((opcao) => opcao.opcao);

  const opcoesO = opcoes.filter((opcao) => opcao.player === 'O').map((opcao) => opcao.opcao);

  for (const jogo of jogos) {
    if (jogo.every((item) => opcoesX.includes(item))) {
      vencedor = 'X';
    }
    if (jogo.every((item) => opcoesO.includes(item))) {
      vencedor = 'O';
    }
  }

  if (!vencedor && opcoesX.length + opcoesO.length === 9) {
    empate = true;
  }

  res.send({
    vencedor,
    empate,
  });
});

//recebe uma porta e uma função (opcional), vai ser chamado quando o servidor terminar de iniciar
app.listen(2222, () => console.log('servidor iniciou'));
