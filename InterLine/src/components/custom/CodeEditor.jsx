import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import ThemeSelect from "@/components/custom/elements/ThemeSelect";
import Options from "@/components/custom/elements/Options";
import { useSelector } from "react-redux";

const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const editorTheme = useSelector((state) => state.theme.editorTheme);
  const  option = useSelector((state) => state.option);
  // console.log(option)
  const [code, setCode] = useState(language.snippet);

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);

  return (
    <>
      <div className="sticky top-0 z-50 bg-red-500 shadow-md">
        <Options />
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg pb-5 w-[80%] mx-auto mt-10">
        {/* Toolbar for Language and Theme Select */}
        <div className="w-full flex flex-row justify-between items-center">
          {/* Language Select on the extreme left */}
          <div className="flex flex-row justify-start  rounded-t-lg pb-1 border-red-200">
            <LanguageSelect />
          </div>
          {/* Theme Select on the extreme right */}
          <div className="rounded-t-lg pb-1  justify-end">
            <ThemeSelect />
          </div>
        </div>

        {/* Monaco Editor */}
        <Editor
          theme={editorTheme}
          language={language.language}
          value={code}
          onChange={(value) => setCode(value)}
          height={"60vh"}
          options={option}
          saveViewState={true}
        />
      </div>

      <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates voluptatem nemo exercitationem suscipit nam, nobis impedit officiis repellat. Facere itaque dicta adipisci impedit veritatis animi numquam nam autem minima architecto.
      Id, fugiat magnam. Perspiciatis, accusantium tempore explicabo assumenda vitae voluptates error laboriosam ipsam magni odit, iste, nam quidem est nemo id vel quibusdam necessitatibus temporibus ea cupiditate. Fugit, quasi optio.
      Non similique illum vitae perspiciatis fugit ducimus veritatis dicta. Similique neque nulla modi doloribus molestiae aut maiores, officia laboriosam eaque, obcaecati, odio nostrum nesciunt porro perspiciatis consequuntur adipisci ullam commodi.
      Fugiat culpa, aut hic, eos temporibus a atque tenetur maiores quidem laborum ratione officia molestias placeat voluptatibus, ab minima. Ratione obcaecati dignissimos impedit, tempora eveniet tenetur. Nemo fugiat voluptatum similique.
      Iste blanditiis nam cupiditate excepturi, a repellendus aut veritatis voluptatem dicta at numquam doloribus deleniti totam, modi nesciunt ipsa! Est amet doloremque modi quis. Expedita voluptates laudantium dolore nihil saepe?
      Earum magnam alias doloribus necessitatibus nesciunt ipsam ea exercitationem officiis aut accusantium labore officia, voluptas consectetur tenetur delectus quasi blanditiis sunt commodi doloremque soluta laudantium ex nostrum? Repudiandae, quibusdam ipsa?
      Rem molestias laborum itaque ullam recusandae, non quis a! Dolorem pariatur officiis aliquam eum quo quaerat nam dicta sed, molestiae optio. Voluptatibus rem, temporibus eligendi quas neque maiores? Facilis, ab!
      Asperiores voluptas quibusdam labore nam odio incidunt corrupti quisquam magni rem. Ea quisquam eligendi, distinctio maiores cumque ab, aut quos repudiandae consequuntur vero inventore, facilis ex voluptas pariatur a vel!
      Quaerat iste obcaecati eius natus similique sint ipsa facilis earum tempora autem? Non expedita quasi rem, eligendi officia a omnis dolores laborum sed quo laboriosam autem possimus laudantium reprehenderit debitis.
      Dolorum error, dolores illo tempora illum itaque nihil tenetur dicta repellat rem consequatur sapiente blanditiis mollitia ab officia sint repudiandae? Repellendus doloremque esse distinctio inventore possimus nisi assumenda voluptate corporis!</span>

    </>);
};

export default CodeEditor;
