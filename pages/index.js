import { useState } from 'react'
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import { useRouter } from 'next/router';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');


  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>

          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={(props) => {
              props.preventDefault();
              
              
              router.push(`/quiz?name=${name}`);

            }}>
              <Input 
              placeholder="Coloque o seu nome para jogar :)" 
              onChange={(props) => {
                  //name = props.target.value;
                  setName(props.target.value);
              }}
              value={name}
              name= "UserName"/>   
              <Button
              type="submit"
              disabled={name.length === 0}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
            
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
