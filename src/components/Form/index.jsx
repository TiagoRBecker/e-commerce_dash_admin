import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "../Select/index";
import Swal from "sweetalert2";
import * as P from "./styled";
import { ReactSortable } from "react-sortablejs";
import Spinner from "../Spinner";
import { NumericFormat } from "react-number-format";
import Api from "../../../utils/api";
import { z } from "zod";
const FormComponent = ({
  _id,
  name: editName,
  brand: editBrand,
  price: editPrice,
  img: editImg,
  descript: editDescript,
  category: editCategory,
  properties: editProperties,
}) => {
  const schema = z.object({
    name: z.string().min(1, { message: "Necessário preencher o  nome" }),
    brand: z.string().min(1, { message: "Necessário preencher a marca" }),
    price: z.string().nonempty("Necessário preencher o preço"),
    img: z.array(z.string()).min(1, "Necessário selecionar uma imagem"),
    descript: z
      .string()
      .min(1, { message: "Necessário preencher a descrição" }),
    category: z
      .string()
      .min(1, { message: "Necessário preecnher a categoria " }),
  });
  const router = useRouter();
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImage] = useState(editImg || []);
  const [error, setError] = useState({});
  const [properties, setProperties] = useState({});
  const [values, setValues] = useState({
    name: editName || "",
    brand: editBrand || "",
    price: editPrice || "",
    descript: editDescript || "",
    category: editCategory || "",
    img: [],
    properties: editProperties || {},
  });



  useEffect(() => {
    // rota para pegar os dados da categoria

    getCategories();
  }, [images, values]);
  const getCategories = async () => {
    const get = await Api.getCategories();
    setCategories(get.getCategory);
    return;
  };
 console.log(images)
  class HandlerUpload {
    //Função para upload de imagems
    static upload = async (e) => {
      const files = e.target?.files;
      const data = new FormData();
      for (const file of files) {
        setUploading(true);
        data.append("file", file);
        const up = await Api.uploadImage(data);
        setImage((oldImages) => {
          return [...oldImages, ...up.link];
        });
      }
      setUploading(false);
    };
    //Função para atualizar as imagens no input
    static updateImagesOrder = (images) => {
      setImage(images);
    };
    //Limpar as imagens
    static clearImg = (e) => {
      e.preventDefault();
      setImage([]);
    };
  }
  //Função para enviar os dados para db
  const handleSubmit = async (e) => {
    e.preventDefault();
    values.properties = properties;
    values.img = images;
    const data = { ...values };
    

   if (_id) {
      //Rota para alterar "caso tenha id aterar o produto e envia a mensagem atraves do Swal"

      try {
        const edit = await Api.updateProduct(_id, data, _id);

        Swal.fire(
          "Produto alterado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        setGoToProduct(true);
      } catch (error) {
        const fieldErrors = error.formErrors?.fieldErrors;
        if (fieldErrors) {
          setError(fieldErrors);
          return;
        }
        Swal.fire(
          "Erro ao alterar o produto!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    } else {
      //Rota para adicionar o produto caso tenha sucesso ou erro swal exibe a mensagem para usuario
      try {
        const validatedData = await schema.parse(values);

        const create = await Api.createProduct(values);

        Swal.fire(
          "Produto cadastrado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        setGoToProduct(true);
      } catch (error) {
        const fieldErrors = error.formErrors?.fieldErrors;
        if (fieldErrors) {
          setError(fieldErrors);
          return;
        }
        Swal.fire(
          "Erro ao alterar o produto!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
    
  };

  //Adiciona as propriedadess no array
  let propertiesToFill = [];
  if (categories?.length > 0) {
    let catInfo = categories.find(({ _id }) => _id === values?.category);

    if (catInfo && catInfo.properties) {
      propertiesToFill.push(...catInfo.properties);
    }
  }
  
  //Funçao para exibir propriedades do produtos exemplo  cores, tamanho ..
  const setProductProp = (propName, value) => {
    setProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  if (goToProduct) {
    router.push("/products");
  }
  return (
    <>
      <P.BoxProducts>
        <h2></h2>
        <P.Form
          method="POST "
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {/*Input para produto */}
          <P.InputBox>
            <label htmlFor="">Nome</label>
            <P.Input
              type="text"
              name="name"
              placeholder="Digite o nome do produto"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {error?.name && <p className="error">{error.name}</p>}
          </P.InputBox>
          {/*Input para a marca */}
          <P.InputBox>
            <label htmlFor="">Marca</label>
            <P.Input
              placeholder="Digite a marca do produto"
              value={values.brand}
              onChange={(e) => setValues({ ...values, brand: e.target.value })}
            />
            {error?.brand && <p className="error">{error.brand}</p>}
          </P.InputBox>
          {/*Input para as categorias */}
          <Select
            text={"Categorias"}
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            categories={categories}
          />
          {error?.category && <p className="error">{error.category}</p>}
          {/*Input para as propriedades */}
          <P.InputBox>
            {propertiesToFill.length > 0 &&
              propertiesToFill.map((p) => (
                <div key={p.name} className="">
                  <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                  <div>
                    <select
                      value={values.properties.name}
                      onChange={(e) => setProductProp(p.name, e.target.value)}
                    >
                      {p.values.map((v) => (
                        <option key={v} value={v}>
                          {v.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </P.InputBox>
          {/*Input para imagens */}
          <P.InputBoxFiles>
            <label htmlFor="">Imagem</label>
            <div className="flex">
              <ReactSortable
                list={images}
                setList={HandlerUpload.updateImagesOrder}
              >
                <div className="input-img">
                  {!!images?.length &&
                    images.map((link) => (
                      <div key={link} className="box-img">
                        <img src={link} alt="" />
                      </div>
                    ))}
                </div>
              </ReactSortable>
              {isUploading && (
                <div>
                  <Spinner />
                </div>
              )}
            </div>

            <label className="upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>

              <P.Input
                type="file"
                onChange={HandlerUpload.upload}
                hidden
                multiple
              />
              <button className="delete" onClick={HandlerUpload.clearImg}>
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
            </label>
            {error?.img && <p className="error">{error.img}</p>}
          </P.InputBoxFiles>

          {/*Input para preço com formato BRL */}
          <P.InputBox>
            <label htmlFor="">Preço</label>
            <NumericFormat
              className="inputPrice"
              displayType="input"
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              placeholder="Digite o preço do produto"
              allowNegative={false}
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
            />
            {error?.price && <p className="error">{error.price}</p>}
          </P.InputBox>
          {/*Input para descriçao */}
          <P.InputBox>
            <label htmlFor="">Descrição</label>

            <textarea
              type="text"
              placeholder="<Insira sua descrição aqui>. Lembre-se de usar . no final de ((CADA)) descrição"
              value={values.descript}
              onChange={(e) =>
                setValues({ ...values, descript: e.target.value })
              }
            />
            {error?.descript && <p className="error">{error.descript}</p>}
          </P.InputBox>

          <P.InputBox>
            <P.Input type="submit" className="submit" />
          </P.InputBox>
        </P.Form>
      </P.BoxProducts>
    </>
  );
};

export default FormComponent;
