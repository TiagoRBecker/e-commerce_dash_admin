import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/Layout";
import Swal from "sweetalert2";
import Center from "@/components/Center";
import Api from "../../../utils/api";
import styled from "styled-components";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { mongooseConnect } from "../../../server/mongose";
import { Category } from "../../../models/Category";
import Link from "next/link";

export const Title = styled.h1`
  width: 100%;
`;
export const BoxCategories = styled.section`
  display: flex;
   width: 100%;
  min-height: 100vh;

  flex-direction: column;
  gap: 3rem;
  .mobile{
    display: none;
  }
  form {
    width: 50vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
   
  }
  label {
    text-align: left;
    width: 100%;
    padding: 0 0.5rem;
    font-size: 1.6rem;
  }

  .box-input select {
    padding: 0 1rem;
    background-color: #2d3142;
    height: 2rem;
    color: #d8d5db;
    border: solid 1px #d8d5db;
    transition: all ease-in-out 0.9s;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box-input input {
    flex-grow: 1;
    width: 100%;
    height: 2rem;

    outline: none;
    padding: 0%.5rem;
    border: solid 1px #333;
    transition: all ease-in-out 0.3s;
    font-size: 0.9rem;
    border-radius: 0.3rem;
  }
  .box-input input:focus {
    border: 1px solid #2d3142;
  }
  .submit {
    padding: 0.8rem;
    background-color: #2d3142;
    height: 2rem;
    color: #d8d5db;
    border: solid 1px #d8d5db;
    transition: all ease-in-out 0.9s;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
  }
  .submit:hover {
    background-color: #d8d5db;
    color: #2d3142;
    border: solid 1px #2d3142;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    .categories-property {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      div {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .description-cell {
    max-width: 200px; /* Define a largura máxima da célula de descrição */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .category-name {
    color: #333;
    font-size: 1.5rem;
    vertical-align: top;
  }

  th {
    background-color: #f2f2f2;
    color: #555;
  }

  .actions {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
  }
  button svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }

  .actions .edit {
    padding: 4px 8px;
    background-color: #2d3142;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: all ease-in-out 0.9s;
  }
  .actions .delet {
    padding: 4px 8px;
    background-color: #f00;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: all ease-in-out 0.9s;
  }

  .actions .edit:hover {
    background-color: #adacb5;
  }
  .actions .delet:hover {
    background-color: #a30000;
  }

  .btn-category {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .btn-category button {
    width: 80px;
    padding: 0.5rem 0;
  }
  .property {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  .box-input-propy {
    width: 100%;
    height: 100%;
    margin-bottom: 0.6rem;
    display: flex;

    gap: 0.9rem;
    .delet {
      padding: 4px 8px;
      background-color: #f00;
      border: none;
      cursor: pointer;
      border-radius: 2px;
      transition: all ease-in-out 0.9s;
    }
    .delet:hover {
      background-color: #a30000;
    }
    
  }
  .box-input-propy input {
    border: solid 1px #ccc;
    height: 2rem;
    padding-left: 0.5rem;
    outline: none;
    border-radius: 4px;
    color: #333;
  }
  .box-input-propy input::placeholder {
    color: #333;
  }
  .box-input {
    display: flex;
    width: 100%;
    gap: 0.8rem;
    padding: 0.9rem 0;
    @media screen and (max-width: 980px) {
      flex-direction: column;
    }
  }
  .box-select {
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  @media screen and (max-width:520px) {
      form{
        width: 100%;
      }
      .box-select{
        justify-content: center;
      }
      .submit{
        width: 100%;
      }
      .box-input-propy{
        flex-direction: column;
      }
      .desktop{
        display: none;
      }
      table .categories-property{
        display: none;
      }
      
      .mobile{
        display: flex;
        align-items: center;
        justify-content: center;
        
      }
      .mobile svg{
        width: 2rem;
        color: #333;
        
      }
    }
`;
export const BoxSpinner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BoxError = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: #333;
    font-size: 2rem;
  }
`;
const Categoires = ({ categories }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [listCategories, setListCategories] = useState(categories);
  const [properties, setProperties] = useState([]);

  //Classe responsavel prlas funçoes de create, edit, delete  categoria
  class HandlerCategory {
    //atualiza a pagina pegando os dados novos do DB
    static handleCategories = async () => {
      router.reload();
    };
    //cria ou altera a categoria
    static createCategory = async (e) => {
      e.preventDefault();

      const data = {
        name,
        properties: properties.map((value) => ({
          name: value.name.trim().toUpperCase(),
          values:
            typeof value.values === "string"
              ? value.values.split(",").map((val) => val.trim().toUpperCase())
              : value.values.map((val) => val.trim().toUpperCase()),
        })),
      };

      if (categoryName) {
        try {
          //atualiza a categoria pelo id
          data._id = categoryName._id;
          const edit = await Api.updateCategory(data._id, data);
          setName("");
          setCategoryName(null);
          setProperties([]);

          await Swal.fire(
            "Categoria alterada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );
          this.handleCategories();
        } catch (error) {
          await Swal.fire(
            "Erro ao alterar a categoria!",
            "Clica no botão para continuar!",
            "error"
          );
        }
      } else {
        try {
          // Cria a  categoria e exibe o modal que foi criada com sucesseo e atualiza o componente!
          const create = await Api.createCategory(data);
          await Swal.fire(
            "Categoria criada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );
          setName("");
          setProperties([]);
          this.handleCategories();
        } catch (error) {
          //exibe o erro ao deletar caso exista algum erro
          await Swal.fire(
            "Erro ao criar a categoria!",
            "Clica no botão para continuar!",
            "error"
          );
        }
      }
    };
    // Exibe  os campos da categoria que for editada
    static editCategory = (category) => {
      setCategoryName(category);
      setName(category?.name);
      setProperties(category.properties);
    };
    //Deleta a categoria
    static handleDelete = async (category) => {
      const del = await Swal.fire({
        title: "Tem certeza?",
        text: `Você quer deletar ${category?.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Deletar",
        confirmButtonColor: "#d55",
      });
      if (del.isConfirmed) {
        try {
          //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
          const delCategories = await Api.deleteCategory(category._id);
          await Swal.fire(
            "Categoria deletada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );

          this.handleCategories();
        } catch (error) {
          //Exibe o modal de erro caso exista um
          await Swal.fire(
            "Erro ao deletar a categoria!",
            "Clica no botão para continuar!",
            "error"
          );
        }
      }
    };
    // Cancela as alteraçoes
    static handleCancel = (e) => {
      e.preventDefault();
      setName("");
      setCategoryName(null);
      setProperties([]);
    };
  }
  //Classe responsavel pas propriedades da categoria  categoria
  class HandlerProperties {
    //adiciona o painel de propriedades
    static addProperty = () => {
      setProperties((prev) => {
        return [...prev, { name: "", values: "" }];
      });
    };
    //adiciona o atributo name da propriedade
    static handlePropertyNameChange = (index, property, newName) => {
      setProperties((prev) => {
        const properties = [...prev];
        const updatedProperty = { ...properties[index] };
        updatedProperty.name = newName;
        properties[index] = updatedProperty;
        return properties;
      });
    };
    //adiciona o atributo  values da propriedade
    static handlePropertyValuesChange = (index, property, newValues) => {
      setProperties((prev) => {
        const properties = [...prev];
        const updatedProperty = { ...properties[index] };

        if (typeof newValues === "string") {
          updatedProperty.values = newValues?.split(",");
        } else {
          updatedProperty.values = newValues;
        }

        properties[index] = updatedProperty;
        return properties;
      });
    };
    // Remove a propriedade  especifica
    static removeProperty = (indexToRemove) => {
      setProperties((prev) => {
        return [...prev].filter((p, pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    };
  }

  return (
    <>
      <Head>
        <title>Categorias</title>
      </Head>
      <Layout>
        <Center>
          <Title>
            {categoryName ? `Editar ${categoryName?.name}` : "Categoria"}
          </Title>
          <BoxCategories>
            <form onSubmit={HandlerCategory.createCategory}>
              <div className="box-input">
                <input
                  type="text"
                  placeholder="Adicione uma categoria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="box-select">
                  <button className="submit">Adicionar</button>
                  <button
                    className="submit"
                    onClick={HandlerCategory.handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              <div className="property">
                <button
                  onClick={HandlerProperties.addProperty}
                  type="button"
                  className="submit"
                >
                  Adicionar Nova Propriedade
                </button>

                {properties.length > 0 &&
                  properties.map((properties, index) => (
                    <div key={index} className="box-input-propy">
                      <input
                        type="text"
                        value={properties?.name}
                        onChange={(ev) =>
                          HandlerProperties.handlePropertyNameChange(
                            index,
                            properties,
                            ev.target.value
                          )
                        }
                        placeholder="Exemplo: (Cores)"
                      />
                      <input
                        type="text"
                        onChange={(ev) =>
                          HandlerProperties.handlePropertyValuesChange(
                            index,
                            properties,
                            ev.target.value
                          )
                        }
                        value={properties?.values}
                        placeholder="Preto,Azul,Verde"
                      />
                      <button
                        onClick={() => HandlerProperties.removeProperty(index)}
                        className="delet"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </form>
            <div>
              {listCategories.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th className="desktop">Propriedades</th>
                      <th >Ações</th>
                      <th className="mobile">Visualizar</th>
                    </tr>
                  </thead>
                  {listCategories.map((category, index) => (
                    <tbody key={index}>
                      <tr>
                        <td className="category-name">
                          <p>{category?.name}</p>
                        </td>

                        <td className="categories-property">
                          {category?.properties.map((property, index) => (
                            <div key={index}>
                            
                              <p>{property.name.toUpperCase()}</p>
                              <p>{property.values?.join(", ").toUpperCase()}</p>
                            </div>
                          ))}
                        </td>

                        <td >
                          <div className="actions">
                            <button
                              className="edit"
                              onClick={() =>
                                HandlerCategory.editCategory(category)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>

                            <button
                              className="delet desktop"
                              onClick={() =>
                                HandlerCategory.handleDelete(category)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>

                        <td className="mobile">
                      <Link href={`categories/${category._id}`}>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              ) : (
                <p>Nenhuma categoria cadastrada</p>
              )}
            </div>
          </BoxCategories>
        </Center>
      </Layout>
    </>
  );
};

export default Categoires;
export const getServerSideProps = async (context) => {
  await mongooseConnect();
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }
  const getCategory = await Category.find();
  const categories = await JSON.parse(JSON.stringify(getCategory));

  return {
    props: {
      session,
      categories,
    },
  };
};
