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

  return (
    <div className="w-screen flex flex-col items-center justify-center bg-orange-100">
      <ViewBar />
      {/* <h1 className="text-4xl font-bold fixed top-0 w-screen bg-inherit text-center">View: {id}</h1> */}
      <p className="text-lg md:text-xl text-black font-merriweather text-left xl:px-64 px-10 mx-auto  pt-56 pb-20">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,
        officiis? Quia, tenetur optio natus placeat et voluptate repudiandae
        saepe animi deserunt beatae minima consequatur dolore inventore
        provident nam veniam aperiam expedita! Sapiente necessitatibus,
        blanditiis velit quibusdam veniam accusantium, quam doloremque doloribus
        maiores, labore ex voluptate modi fugit molestiae sed est quo? Optio,
        voluptatibus corporis reiciendis perspiciatis iste necessitatibus maxime
        expedita veniam hic distinctio nesciunt quidem aliquam cupiditate dicta
        fugiat ab, ea ex explicabo. Totam odit tempora ratione debitis quo
        necessitatibus accusantium, cumque ullam, nam perferendis qui? Deleniti
        odio quaerat fuga possimus exercitationem? Eum minus dolore ipsum? Iure
        assumenda harum quod nesciunt. Ipsam ut, veniam porro esse ea labore
        optio beatae voluptatum quae maxime omnis sint, officiis sequi? Odio
        obcaecati officia neque, dolor, corporis sunt amet fugiat pariatur ea,
        expedita dolorum quam. Sint recusandae, aliquam eos, vitae magnam eum
        repellat nisi quas ipsa sed qui, quos harum omnis alias nihil. Expedita,
        animi? Explicabo nesciunt illo eum quibusdam, labore neque minus
        necessitatibus voluptatem id voluptatibus a fugit molestiae maxime,
        nostrum fugiat esse odio quaerat similique quos cupiditate sint iste.
        Reprehenderit ducimus veritatis eveniet sit minima, amet commodi, quod
        consequuntur aliquid soluta laboriosam. Aspernatur, ipsum a qui aliquam
        saepe id sit necessitatibus eaque fuga mollitia non vitae similique?
        Quibusdam ipsam molestias earum fugit labore assumenda repellat quaerat
        tempora! Alias minima, dolores labore quod accusantium quae accusamus
        ab, vel quos aut enim saepe aspernatur veritatis quisquam, tenetur
        quibusdam sapiente earum. Alias rem asperiores temporibus id
        consequuntur esse nemo eos adipisci eligendi libero sit fuga ab tempora
        eaque molestiae iure, at ad deleniti tenetur optio. Commodi facilis
        exercitationem suscipit provident distinctio? Voluptatum facere vel
        autem illo laudantium perferendis architecto nam dolore vero fugiat
        voluptatem iste rerum, accusantium tenetur aliquid non blanditiis ipsam!
        Optio dolorem expedita sapiente, rem recusandae, consectetur tenetur
        iure, repudiandae error est earum beatae dolorum delectus! Aut sint
        fugit accusantium voluptates repudiandae vitae et exercitationem, iste
        consectetur incidunt ipsum saepe vel quas maiores iure aspernatur magni
        nobis praesentium id dolor. Optio voluptatibus architecto molestias
        dolore minus culpa labore, ut quod alias! Natus, fugiat quisquam
        molestias esse deleniti sequi distinctio? Architecto commodi error quo
        veritatis porro, voluptates ipsum similique corporis quisquam facere,
        vel dignissimos libero repellendus enim deserunt esse possimus voluptate
        illum? Reiciendis soluta magnam ea porro optio possimus commodi nihil ad
        velit qui consequatur vero, pariatur illum libero perspiciatis quas
        aliquid ab facere esse quos. Quasi, natus quidem repudiandae molestiae
        officia quis neque!
      </p>
      <SearchBar fixed onChange={handleSearch} />
    </div>
  );
}

export default View;
