import GroupListItem from "../GroupComponents/GroupListItem";
import Pagination from "../../CommonComponents/Pagination/Pagination";
/////////////
import CreateTable from "../../CommonComponents/CreateTable";
///////////

import React, { useState, useEffect } from "react";
import axios from "axios";

import { APIroot } from "../../Store";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const navigate = useNavigate()

  const TableNavHandler = (gpk) => {
    navigate(`/group/${gpk}/notice`)
  }

  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  
  const [groupList, setGroupList] = useState([]);
  console.log(loginUser.userPk);
  console.log(groupList);
  /////////////////////////////////////
    const data = React.useMemo(
      () => groupList,
      [groupList]
    )
  
    const columns = React.useMemo(
      () => [
        {
          Header: '번호',
          accessor: 'cnt', // accessor is the "key" in the data
          width: 100,
        },
        {
          Header: '제목',
          accessor: 'groupName',
          width: 400,
        },
        {
          Header: '작성자',
          accessor: 'nickname',
          width: 100,
        },
        {
          Header: '등록일자',
          accessor: 'callStartTime',
          width: 100,
        },
      ],
      []
    )
  ////////////////////////////////////////

  useEffect(() => {
    console.log("실행");
    axios({
      method: "GET",
      url: `${API}/group/list`,
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setGroupList(response.data);
    });
  }, [API]);

  const liList = groupList.map((groupitem, index) => {
    console.log(groupitem);
    return (
      <GroupListItem
      key={index}
      id={groupitem.cnt}
      title={groupitem.gname}
      nickname={groupitem.nickname}
      count={groupitem.count}
      />
    );
  });

  return (
    <div>
      <TitleStyle>
        <div className="name">"{loginUser.userName}"</div> <div className="wellcome">님의 Group List</div>
      </TitleStyle>
    <Styles>
      <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandler}/>
    </Styles>

      {/* <ContentBox>
        <ul>{liList}</ul>
        {groupList}
      </ContentBox> */}
      {/* <Pagination></Pagination> */}
    </div>
  );
};

export default GroupList;


const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin: 2vh;
  height: 8vh;
  .name {
    display: flex;
    font-size: 2em;
    margin-right: 5px;
  };
  .wellcome {
    display: flex;
    font-size: 1em;
  };
  border: 1px solid black;
`;

const ContentBox = styled.div``;


const Styles = styled.div`
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
`