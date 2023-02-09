import { APIroot, pageNumber } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';

const MyPageQuestionList = () => {
    const [questionRecord, setQuestionRecord] = useState([]);
    const [page, setPage] = useRecoilState(pageNumber);
    const [totalPosts, setTotalPosts] = useState(0);
    const API = useRecoilValue(APIroot);
    const navigate = useNavigate();
    
    const TableNavHandler = (row) => {
      console.log(row.original.conferenceQuestionPk)
        navigate(`/my-question-record/${row.original.conferenceQuestionPk}`); // my-question-record 의 게시글 중 한개 상세페이지로 가는 경로
    }
    
    const data = React.useMemo(() => questionRecord, [questionRecord]);

    const columns = React.useMemo(
        () => [
            { Header: '번호', accessor: 'conferencePk', width: 90},
            { Header: '질문 내용', accessor: 'conferenceQuestionContents', width: 250},
            { Header: '미팅명', accessor: 'conferenceTitle', width: 180},
            { Header: '그룹명', accessor: 'groupName', width: 140},
            { Header: '질문 일자', accessor: 'conferenceQuestionDate', width: 220},
        ], []
    );

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API}/user/my-question-record?nowPage=${page}&items=7`,
            headers: {
                'Content-Type': 'application/json',
                AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        .then((response) => {
            console.log(response.data)
            setTotalPosts(response.data.question_record[0].total);
            setQuestionRecord(response.data.question_record);
        })
    }, [API, page]);

    return(
        // <Scrollsize>
            <Styles>
                <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandler} />
                <Pagination totalPosts={`${totalPosts}`} limit="9" page={page} setPage={setPage}></Pagination>
            </Styles>
        // </Scrollsize>
    );
};

export default MyPageQuestionList;

const Styles = styled.div`
  text-align: center;
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
// const Scrollsize = styled.div`
//   height: 46vh;
//   overflow-y: scroll;
// `;