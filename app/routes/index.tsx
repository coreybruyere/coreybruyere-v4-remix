import { useLoaderData, json, Link } from "remix";
import { GraphQLClient, gql } from "graphql-request";

const GetPostsQuery = gql`
  {
    posts {
      title
    }
  }
`;

export let loader = async () => {
  const graphcms = new GraphQLClient(
    "https://api-us-west-2.graphcms.com/v2/ckz4ysyab0ig701z58h7j6k9w/master"
  );

  const { posts } = await graphcms.request(GetPostsQuery);

  return json({ posts });
};

export default function Index() {
  let data = useLoaderData();

  console.log(data);

  return (
    <ul>
      {data.posts.map(({ title }: any) => (
        <li key={title}>
          {/* <Link to={`/products/${slug}`} prefetch="intent"> */}
          <a>{title}</a>
          {/* </Link> */}
        </li>
      ))}
    </ul>
  );
}
