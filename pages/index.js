import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>

          <Widget.Header>
            <h1>Finanças na prática</h1>
          </Widget.Header>

          <Widget.Content>
            <p>Aqui seria alguma coisa por enquanto um teste 🐱‍👤</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Finanças na prática</h1>

            <p>Aqui seria alguma coisa por enquanto um teste 🐱‍👤</p>
          </Widget.Content>
        </Widget>
        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AlanPoveda" />

    </QuizBackground>

  );
}
