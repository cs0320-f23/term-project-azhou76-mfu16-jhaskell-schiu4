import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ViewBar from "./ViewBar";
import SearchBar from "./SearchBar";

function View() {
  const { id } = useParams();
  console.log(id);
  function handleSearch(value: string) {
    console.log(value);
  }

  function getContent(id: string): {
    [key: string]: string | { [key: string]: string };
  } {
    return {
      Title: "Lord of the Rings",
      Chapters: {
        "Chapter 1":
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, officiis? Quia, tenetur optio natus placeat et voluptate repudiandae saepe animi deserunt beatae minima consequatur dolore inventore provident nam veniam aperiam expedita! Sapiente necessitatibus, blanditiis velit quibusdam veniam accusantium, quam doloremque doloribus maiores, labore ex voluptate modi fugit molestiae sed est quo? Optio, voluptatibus corporis reiciendis perspiciatis iste necessitatibus maxime expedita veniam hic distinctio nesciunt quidem aliquam cupiditate dicta fugiat ab, ea ex explicabo. Totam odit tempora ratione debitis quo necessitatibus accusantium, cumque ullam, nam perferendis qui? Deleniti odio quaerat fuga possimus exercitationem? Eum minus dolore ipsum? Iure assumenda harum quod nesciunt. Ipsam ut, veniam porro esse ea labore optio beatae voluptatum quae maxime omnis sint, officiis sequi? Odio obcaecati officia neque, dolor, corporis sunt amet fugiat pariatur ea, expedita dolorum quam. Sint recusandae, aliquam eos, vitae magnam eum repellat nisi quas ipsa sed qui, quos harum omnis alias nihil. Expedita, animi? Explicabo nesciunt illo eum quibusdam, labore neque minus necessitatibus voluptatem id voluptatibus a fugit molestiae maxime, nostrum fugiat esse odio quaerat similique quos cupiditate sint iste. Reprehenderit ducimus veritatis eveniet sit minima, amet commodi, quod consequuntur aliquid soluta laboriosam. Aspernatur, ipsum a qui aliquam saepe id sit necessitatibus eaque fuga mollitia non vitae similique? Quibusdam ipsam molestias earum fugit labore assumenda repellat quaerat tempora! Alias minima, dolores labore quod accusantium quae accusamus ab, vel quos aut enim saepe aspernatur veritatis quisquam, tenetur quibusdam sapiente",
        "Chapter 2":
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facilis maxime accusantium. Ratione, fugiat placeat eum fuga eveniet amet porro officiis pariatur hic eius doloribus nihil consequatur laboriosam a, quae deleniti voluptatem quod est enim aut nisi aperiam? Facere ipsum sed quo aliquam eius temporibus sapiente voluptatem molestias provident asperiores, soluta necessitatibus vero voluptate doloribus obcaecati? A perspiciatis dolore voluptatum beatae! Officia ab impedit quia voluptatem, veritatis ea? Accusamus eos labore harum exercitationem et. Nesciunt, incidunt quis reprehenderit assumenda suscipit saepe illo reiciendis, sit qui esse delectus, exercitationem distinctio enim. Enim ad et dolorem? Ratione veritatis eligendi animi laudantium id.",
      },
    };
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center bg-orange-100">
      <ViewBar />
      {/* <h1 className="text-4xl font-bold fixed top-0 w-screen bg-inherit text-center">View: {id}</h1> */}
      <div className="text-2xl text-center fixed top-20 w-screen py-4 bg-inherit">
        {id && (getContent(id)["Title"] as string)}
      </div>
      <div className="text-lg md:text-xl text-black font-merriweather text-left xl:px-64 px-10 mx-auto  pt-56 pb-20">
        {id &&
          Object.entries(
            getContent(id)["Chapters"] as { [key: string]: string }
          ).map(([key, value]) => (
            <div key={key}>
              <h2 className="font-bold">{key}</h2>
              <p>{value}</p>
            </div>
          ))}
      </div>
      <SearchBar fixed onChange={handleSearch} />
    </div>
  );
}

export default View;
