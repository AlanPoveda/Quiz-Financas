import React from 'react';
import { useState, useEffect } from 'react'

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import QuizContainer  from '../src/components/QuizContainer';






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
onSubmit,
addResult, }) {
    const [ selectAlternative, setSelectedAlternative ] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorret = selectAlternative === question.answer;
    const hasAlternativeSelected = selectAlternative !== undefined;
    
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
                setIsQuestionSubmited(true);
                setTimeout(()=>{
                    addResult(isCorret);
                    onSubmit();
                    setIsQuestionSubmited(false);
                    setSelectedAlternative(undefined);
                }, 2 * 1000)
                
            }}>
            {question.alternatives.map((alternative, alternativeIndex)=>{
                const alternativeId = `alternative__${alternativeIndex}`

                return (
                    <Widget.Topic
                        as="label"
                        key={alternativeId}
                        htmlFor={alternativeId}
                    >
                        <input
                            id={alternativeId}
                            type="radio"
                            name={questionId}
                            onChange={()=> setSelectedAlternative(alternativeIndex)}
                        />
                        {alternative}
                    </Widget.Topic>
                );
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>
                Confirmar
            </Button>

            { isQuestionSubmited && isCorret && <p>Você Acertou :D !</p> }
            { isQuestionSubmited && !isCorret && <p>Você Errou :/ !</p>}
            </form>

        </Widget.Content>
            
        </Widget>

    );
};


function ResultWidget({ results }){
    return(
        <Widget>
            <Widget.Header>
                <h1>Tela de resultado.</h1>
            </Widget.Header>
            <Widget.Content>
                <p>Você Acertou 😁 
                    {' '}
                    {results.reduce((somatoriaAtual, resultAtual) => {
                    const isAcerto = resultAtual === true
                    if(isAcerto) {
                        return somatoriaAtual + 1;
                    }

                    return (somatoriaAtual);
                    
                }, 0)} 
                {' '}
                Perguntas</p>
                    <ul>
                        {results.map((result, index)=>(
                            <li key={`result__${result}`}>
                                #0
                                {index + 1} 
                                {' '}
                                Resultado: {result === true ? "Acertou" : "Errou"}
                            </li>
                        ))}
                        
                    </ul>    
            </Widget.Content>
            
        </Widget>
    );
};


const screenStates = {
    QUIZ: "QUIZ",
    LOADING:"LOADING",
    RESULT:"RESULT",
};

export default function QuizPage( ) {
    const [screenState , setScreenState ] = useState(screenStates.LOADING);
    const [results, setResults] = useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result){
        setResults([
            ...results,
            result,
        ]);
    }

    // Para poder renderizar as páginas ainda dando um tempo do spinner
    useEffect(()=>{
        //fetch
        setTimeout(()=>{
            setScreenState(screenStates.QUIZ);
        }, 1 * 2000);
    }, []);
    
    //Aonde esta fazendo a contagem para ir para a próxima questão
    function handleSubmit(){
        const nextQuestion = questionIndex + 1;        
        if (nextQuestion < totalQuestions){
            setCurrentQuestion(nextQuestion)    
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
                addResult={addResult}
        />
        )}
            {screenState === screenStates.LOADING && <LoadingWidget />}

            {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
        
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/AlanPoveda"/>
    </QuizBackground> 
    );
}