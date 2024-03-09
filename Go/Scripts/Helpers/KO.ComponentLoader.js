"use strict";
var GO;
(function (GO) {
    var KO;
    (function (KO) {
        class ComponentLoader {
            constructor() {
                this.LastPageViewModel = {};
                this.nodePrefixes = [];
                this.componentLoaders = {};
            }
            AddComponentDetails(elementPrefix, urlPath, namespace) {
                this.nodePrefixes.push(elementPrefix);
                this.componentLoaders[elementPrefix] = {
                    UrlPath: urlPath,
                    Namespace: namespace,
                    IsPage: false
                };
            }
            AddPageDetails(elementPrefix, urlPath, namespace = '') {
                this.nodePrefixes.push(elementPrefix);
                this.componentLoaders[elementPrefix] = {
                    UrlPath: urlPath,
                    Namespace: namespace,
                    IsPage: true
                };
            }
            RegisterAddedComponents() {
                //Tell knockout to check for custom elements starting with added component details.
                ko.components.getComponentNameForNode = (node) => {
                    let tagNameLower = node.tagName && node.tagName.toLowerCase();
                    if (ko.components.isRegistered(tagNameLower)) {
                        return tagNameLower;
                    } //Check for any other registered components.
                    for (let prefix of this.nodePrefixes) {
                        if (tagNameLower.startsWith(prefix)) {
                            return tagNameLower;
                        }
                    }
                    return '';
                };
                //Using custom loaders as knockout only supports require AMD loading by default.
                let namingConventionLoader = {
                    //Function to handle the custom naming conventions.
                    getConfig: (name, callback) => {
                        //Find the prefix.
                        let prefix = '';
                        for (let nodePrefix of this.nodePrefixes) {
                            if (name.startsWith(nodePrefix)) {
                                prefix = nodePrefix;
                                break;
                            }
                        }
                        //console.log(name);
                        let className = name.replace(prefix, '');
                        let path = className.replace(/_/g, '/').replace(/-/g, '');
                        let filename = className.replace(/-|_/g, '');
                        let url = `${this.componentLoaders[prefix].UrlPath}/${path}/${filename}`;
                        //console.log('url', url, prefix, name);
                        //console.log(this.componentLoaders[prefix]);
                        callback({
                            createViewModel: { name: className, url: url, ns: this.componentLoaders[prefix].Namespace },
                            template: { url: url },
                            IsPage: this.componentLoaders[prefix].IsPage
                        });
                    },
                    //Function that loads the template.html and template .js files.
                    loadComponent: (name, componentConfig, callback) => {
                        //console.log(componentConfig);
                        let func = async () => {
                            let templateString = await GO.LoadFileData(componentConfig.template.url + '.html'); //TODO: Load at the same time.
                            let result = {
                                template: ko.utils.parseHtmlFragment(templateString)
                            };
                            if (componentConfig.createViewModel.ns != '') {
                                await GO.LoadScript(componentConfig.createViewModel.url + '.js');
                                result.createViewModel = (params, options) => {
                                    let fn = GO.GetFunctionByName(`${componentConfig.createViewModel.ns}.${ToPascalCase(componentConfig.createViewModel.name)}ViewModel`);
                                    if (componentConfig.IsPage) {
                                        this.LastPageViewModel = new fn(params, options);
                                        return this.LastPageViewModel;
                                    }
                                    return new fn(params, options);
                                };
                            }
                            callback(result);
                        };
                        func();
                        //GO.LoadFileData(componentConfig.template.url + '.html').then((templateString: string) => { //TODO: Load at the same time.
                        //    let result: KnockoutComponentTypes.Definition = {
                        //        template: ko.utils.parseHtmlFragment(templateString)
                        //    }
                        //    if (componentConfig.createViewModel.ns != '') {
                        //        GO.LoadScript(componentConfig.createViewModel.url + '.js').then(() => {
                        //            result.createViewModel = (params, options: { element: Node }) => {
                        //                let fn = GO.GetFunctionByName(`${componentConfig.createViewModel.ns}.${ToPascalCase(componentConfig.createViewModel.name)}ViewModel`);
                        //                return new fn(params, options);
                        //            }
                        //            callback(result);
                        //        });
                        //    }
                        //    else {
                        //        callback(result);
                        //    }
                        //});
                    }
                };
                function ToPascalCase(dasherized) {
                    return dasherized.replace(/(^|-|_)([a-z])/g, function (g, m1, m2) { return m2.toUpperCase(); });
                }
                //Register our custom loader to take priority over the default loader.
                ko.components.loaders.unshift(namingConventionLoader);
            }
        }
        KO.ComponentLoader = ComponentLoader;
    })(KO = GO.KO || (GO.KO = {}));
})(GO || (GO = {}));
