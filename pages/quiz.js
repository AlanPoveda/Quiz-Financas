import React from 'react';
import { useState } from 'react'
import styled from 'styled-components';
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
            <Widget.Content>
                [Fazer imagem do loading]
            </Widget.Content>
        </Widget>
    );
};

function QuestionWidget({ 
question, 
totalQuestions, 
questionIndex }) {
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
            src="https://placehold.it/400x400"
        />
        <Widget.Content>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <Button type="submit">
                Confirmar
            </Button>
        </Widget.Content>
            
        </Widget>

    );
};

export default function QuizPage( ) {
    const totalQuestions = db.questions.length;
    const questionIndex = 0;
    const question = db.questions[questionIndex];

    return(
      <QuizBackground backgroundImage={db.bg}>  
        <QuizContainer>
            
        <QuestionWidget 
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
        />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/AlanPoveda"/>
    </QuizBackground> 
    );
}