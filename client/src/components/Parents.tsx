import React, { ReactNode } from 'react'
import { gql, useQuery } from '@apollo/client';
import Loading from '../shared/Loading';
import { Link, To } from 'react-router-dom';

const parents = gql`
  query parent_user{
    parent_user(distinct_on:parent_id, limit:10){
        id
        user_id
        parent_id
    }
  }
`;
const Parents = () => {
    const { loading, error, data } = useQuery(parents, {
        fetchPolicy: "cache-and-network"
      });

  return (
    <Loading loading={loading} error={error}>
        {data?.parent_user?.map?.((parent: any, i: React.Key | null | undefined) => <Link to={`/${parent.parent_id}`} key={i}><div>Parent with id: {parent.parent_id}</div></Link>)}
    </Loading>
  )
}

export default Parents;
