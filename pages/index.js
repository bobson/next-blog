import Head from "next/head";

import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-utils";

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>My Blog</title>
        <meta
          name="description"
          content="I post about programing and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
