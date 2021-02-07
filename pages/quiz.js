import React from 'react';
import { useState, useEffect } from 'react'

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import QuizContainer  from '../src/components/QuizContainer';
import CoinSprite  from '../src/components/Coin';


function LoadingWidget(){
    return(
        <Widget>
            <Widget.Header>
                <h1>Carregando...</h1>
            </Widget.Header>
                <img 
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                    src="https://media.giphy.com/media/Hx13ouuEzEff1GbcpJ/giphy.gif"
                />
            
        </Widget>
    );
};

function QuestionWidget({ 
question, 
totalQuestions, 
questionIndex,
onSubmit, }) {
    const questionId = `question__${questionIndex}`;
    
    return(
        <Widget>
        <Widget.Header>
                    <h3>
                        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                    </h3>
        </Widget.Header>
        <img
        alt="Descrição"
        style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
        }}
            src={question.image}
        />
        <Widget.Content>
            <h2>{question.title}</h2>
            <p>{question.description}</p>

            <form onSubmit={(props)=>{
                props.preventDefault();
                onSubmit();
            }}>
            {question.alternatives.map((alternative, alternativeIndex)=>{
                const alternativeId = `alternative__${alternativeIndex}`

                return (
                    <Widget.Topic
                        as="label"
                        htmlFor={alternativeId}
                    >
                        <input
                            id={alternativeId}
                            type="radio"
                            name={questionId}
                        />
                        {alternative}
                    </Widget.Topic>
                );
            })}
            <Button type="submit">
                Confirmar
            </Button>
            </form>

        </Widget.Content>
            
        </Widget>

    );
};

function ResultWidget(){

    return(
        <Widget>
            <Widget.Content>
                <h1>[Acertou x pontos Miserável]</h1>
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: "QUIZ",
    LOADING:"LOADING",
    RESULT:"RESULT",
};
export default function QuizPage( ) {
    const [screenState , setScreenState ] = useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    // Para poder renderizar as páginas ainda dando um tempo do spinner
    useEffect(()=>{
        //fetch
        setTimeout(()=>{
            setScreenState(screenStates.QUIZ);
        }, 1 * 2000);
    }, []);
    
    //Aonde esta fazendo a contagem para ir para a próxima questão
    function handleSubmit(){
        
        if (currentQuestion < totalQuestions){
            setCurrentQuestion(questionIndex + 1)    
        }else {
            setScreenState(screenStates.RESULT);
        }
            
    };
    
    return(
      <QuizBackground backgroundImage={db.bg}>  
        <QuizContainer>
            {screenState === screenStates.QUIZ && (
            <QuestionWidget 
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmit}
        />
        )}
            {screenState === screenStates.LOADING && <LoadingWidget />}

            {screenState === screenStates.RESULT && <ResultWidget />}
        
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/AlanPoveda"/>
    </QuizBackground> 
    );
}