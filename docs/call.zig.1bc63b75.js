var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   21","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   22","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   23","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   24","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   25","line":"const GenericError = @import(\"../errors/generic_error.zig\").GenericError;"},
{"lineNum":"   26","line":"const TypeError = @import(\"../errors/type_error.zig\").TypeError;"},
{"lineNum":"   27","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   28","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   29","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   30","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   31","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"pub fn inferCallType(","class":"lineCov","hits":"1","order":"5049","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp: *Compiler,"},
{"lineNum":"   35","line":"    nd: node.Node,"},
{"lineNum":"   36","line":"    ctx: *const InferContext,"},
{"lineNum":"   37","line":"    call: node.Call,"},
{"lineNum":"   38","line":") InferResult {"},
{"lineNum":"   39","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"5050","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    const func = inferExprType(cmp, call.expr, &subCtx);","class":"lineCov","hits":"1","order":"5051","possible_hits":"1",},
{"lineNum":"   42","line":"    if (func.getType() != .Success)","class":"lineCov","hits":"2","order":"5052","possible_hits":"2",},
{"lineNum":"   43","line":"        return func;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    if (func.Success.getType() != .Function) {","class":"lineCov","hits":"3","order":"5055","possible_hits":"3",},
{"lineNum":"   46","line":"        return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"                call.expr.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"                if (call.expr.getType() == .Ident)","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   50","line":"                    cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"                        \"Variable \'{s}\' is not a function\","},
{"lineNum":"   52","line":"                        .{call.expr.data.Ident},","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   53","line":"                    )"},
{"lineNum":"   54","line":"                else"},
{"lineNum":"   55","line":"                    \"Calling a value that is not a function\","},
{"lineNum":"   56","line":"            ),"},
{"lineNum":"   57","line":"        ));"},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    const funcTy = func.Success.Function;","class":"linePartCov","hits":"2","order":"5056","possible_hits":"3",},
{"lineNum":"   61","line":"    const ctxIsConstructible = ctx.isConstructible();","class":"lineCov","hits":"1","order":"5057","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    if (funcTy.isConstructable and !ctxIsConstructible) {","class":"linePartCov","hits":"2","order":"5062","possible_hits":"3",},
{"lineNum":"   64","line":"        return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"                call.expr.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"                \"Value is not callable. Did you mean to include \'new\'?\","},
{"lineNum":"   68","line":"            ),"},
{"lineNum":"   69","line":"        ));"},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    if (!funcTy.isConstructable and ctxIsConstructible) {","class":"lineCov","hits":"2","order":"5063","possible_hits":"2",},
{"lineNum":"   73","line":"        // TODO: Check for errorOnImplicitAny in config"},
{"lineNum":"   74","line":"        return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"                call.expr.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"                \"\'new\' expression, whose target lacks a construct signature, implicitly has an \'any\' type\","},
{"lineNum":"   78","line":"            ),"},
{"lineNum":"   79","line":"        ));"},
{"lineNum":"   80","line":"    }"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    if (funcTy.args.len != call.args.items.len) {","class":"lineCov","hits":"2","order":"5064","possible_hits":"2",},
{"lineNum":"   83","line":"        return InferResult.err(CompileError.genericError(","class":"lineCov","hits":"1","order":"6794","possible_hits":"1",},
{"lineNum":"   84","line":"            GenericError.new(","class":"lineCov","hits":"1","order":"6793","possible_hits":"1",},
{"lineNum":"   85","line":"                call.expr.csr,","class":"lineCov","hits":"1","order":"6790","possible_hits":"1",},
{"lineNum":"   86","line":"                cmp.fmt(","class":"lineCov","hits":"2","order":"6791","possible_hits":"2",},
{"lineNum":"   87","line":"                    \"Function expected {d} arguments but found {d}\","},
{"lineNum":"   88","line":"                    .{ funcTy.args.len, call.args.items.len },","class":"lineCov","hits":"1","order":"6792","possible_hits":"1",},
{"lineNum":"   89","line":"                ),"},
{"lineNum":"   90","line":"            ),"},
{"lineNum":"   91","line":"        ));"},
{"lineNum":"   92","line":"    }"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    for (call.args.items) |arg, index| {","class":"lineCov","hits":"2","order":"5065","possible_hits":"2",},
{"lineNum":"   95","line":"        const res = inferExprType(cmp, arg, &subCtx);","class":"lineCov","hits":"1","order":"5066","possible_hits":"1",},
{"lineNum":"   96","line":"        if (res.getType() != .Success)","class":"lineCov","hits":"2","order":"5067","possible_hits":"2",},
{"lineNum":"   97","line":"            return res;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"        const ty = res.Success;","class":"linePartCov","hits":"2","order":"5068","possible_hits":"3",},
{"lineNum":"  100","line":"        const argTy = funcTy.args[index];","class":"linePartCov","hits":"1","order":"5069","possible_hits":"2",},
{"lineNum":"  101","line":"        if (!ty.isAssignableTo(argTy)) {","class":"lineCov","hits":"2","order":"5070","possible_hits":"2",},
{"lineNum":"  102","line":"            return InferResult.err(CompileError.typeError(","class":"lineCov","hits":"1","order":"6824","possible_hits":"1",},
{"lineNum":"  103","line":"                TypeError.new(arg.csr, ty, argTy),","class":"lineCov","hits":"1","order":"6823","possible_hits":"1",},
{"lineNum":"  104","line":"            ));"},
{"lineNum":"  105","line":"        }"},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    nd.ty = funcTy.ret;","class":"lineCov","hits":"1","order":"5071","possible_hits":"1",},
{"lineNum":"  109","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"5072","possible_hits":"2",},
{"lineNum":"  110","line":"}"},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"test \"can infer type of function call with no arguments\" {","class":"lineCov","hits":"3","order":"6737","possible_hits":"3",},
{"lineNum":"  113","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    const func = node.makeNode(alloc, Cursor.new(0, 0), .Ident, \"aFunction\");","class":"lineCov","hits":"1","order":"6738","possible_hits":"1",},
{"lineNum":"  116","line":"    defer alloc.destroy(func);","class":"linePartCov","hits":"1","order":"6748","possible_hits":"2",},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    const args = node.NodeList{};"},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6747","possible_hits":"2",},
{"lineNum":"  121","line":"        .expectedTy = .Boolean,"},
{"lineNum":"  122","line":"        .setup = (struct {"},
{"lineNum":"  123","line":"            fn setup(","class":"lineCov","hits":"1","order":"6741","possible_hits":"1",},
{"lineNum":"  124","line":"                scope: *Scope,"},
{"lineNum":"  125","line":"                typebook: *TypeBook,"},
{"lineNum":"  126","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6746","possible_hits":"1",},
{"lineNum":"  127","line":"                scope.put(","class":"lineCov","hits":"2","order":"6742","possible_hits":"2",},
{"lineNum":"  128","line":"                    \"aFunction\","},
{"lineNum":"  129","line":"                    typebook.getFunction(","class":"lineCov","hits":"2","order":"6743","possible_hits":"2",},
{"lineNum":"  130","line":"                        typebook.getBoolean(),","class":"lineCov","hits":"1","order":"6744","possible_hits":"1",},
{"lineNum":"  131","line":"                        &[_]Type.Ptr{},"},
{"lineNum":"  132","line":"                        false,"},
{"lineNum":"  133","line":"                    ),"},
{"lineNum":"  134","line":"                    true,"},
{"lineNum":"  135","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6745","possible_hits":"1",},
{"lineNum":"  136","line":"                );"},
{"lineNum":"  137","line":"            }"},
{"lineNum":"  138","line":"        }).setup,"},
{"lineNum":"  139","line":"    }).run(.Call, .{","class":"lineCov","hits":"1","order":"6740","possible_hits":"1",},
{"lineNum":"  140","line":"        .expr = func,","class":"lineCov","hits":"1","order":"6739","possible_hits":"1",},
{"lineNum":"  141","line":"        .args = args,"},
{"lineNum":"  142","line":"    });"},
{"lineNum":"  143","line":"}"},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"test \"can infer type of function call with arguments\" {","class":"lineCov","hits":"3","order":"6749","possible_hits":"3",},
{"lineNum":"  146","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    const func = node.makeNode(alloc, Cursor.new(0, 0), .Ident, \"aFunction\");","class":"lineCov","hits":"1","order":"6750","possible_hits":"1",},
{"lineNum":"  149","line":"    defer alloc.destroy(func);","class":"linePartCov","hits":"1","order":"6772","possible_hits":"4",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    const arg1 = node.makeNode(alloc, Cursor.new(0, 0), .Int, \"34\");","class":"lineCov","hits":"1","order":"6751","possible_hits":"1",},
{"lineNum":"  152","line":"    const arg2 = node.makeNode(alloc, Cursor.new(0, 0), .String, \"a string\");","class":"lineCov","hits":"1","order":"6752","possible_hits":"1",},
{"lineNum":"  153","line":"    defer alloc.destroy(arg1);","class":"linePartCov","hits":"1","order":"6771","possible_hits":"4",},
{"lineNum":"  154","line":"    defer alloc.destroy(arg2);","class":"linePartCov","hits":"1","order":"6770","possible_hits":"4",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    var args = node.NodeList{};","class":"lineCov","hits":"1","order":"6753","possible_hits":"1",},
{"lineNum":"  157","line":"    defer args.deinit(alloc);","class":"linePartCov","hits":"1","order":"6769","possible_hits":"4",},
{"lineNum":"  158","line":"    try args.append(alloc, arg1);","class":"linePartCov","hits":"1","order":"6754","possible_hits":"2",},
{"lineNum":"  159","line":"    try args.append(alloc, arg2);","class":"linePartCov","hits":"1","order":"6755","possible_hits":"2",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6768","possible_hits":"2",},
{"lineNum":"  162","line":"        .expectedTy = .Boolean,"},
{"lineNum":"  163","line":"        .setup = (struct {"},
{"lineNum":"  164","line":"            fn setup(","class":"lineCov","hits":"1","order":"6759","possible_hits":"1",},
{"lineNum":"  165","line":"                scope: *Scope,"},
{"lineNum":"  166","line":"                typebook: *TypeBook,"},
{"lineNum":"  167","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6767","possible_hits":"1",},
{"lineNum":"  168","line":"                scope.put(","class":"lineCov","hits":"2","order":"6760","possible_hits":"2",},
{"lineNum":"  169","line":"                    \"aFunction\","},
{"lineNum":"  170","line":"                    typebook.getFunction(","class":"lineCov","hits":"2","order":"6761","possible_hits":"2",},
{"lineNum":"  171","line":"                        typebook.getBoolean(),","class":"lineCov","hits":"1","order":"6762","possible_hits":"1",},
{"lineNum":"  172","line":"                        &[_]Type.Ptr{","class":"lineCov","hits":"1","order":"6765","possible_hits":"1",},
{"lineNum":"  173","line":"                            typebook.getNumber(),","class":"lineCov","hits":"1","order":"6763","possible_hits":"1",},
{"lineNum":"  174","line":"                            typebook.getString(),","class":"lineCov","hits":"1","order":"6764","possible_hits":"1",},
{"lineNum":"  175","line":"                        },"},
{"lineNum":"  176","line":"                        false,"},
{"lineNum":"  177","line":"                    ),"},
{"lineNum":"  178","line":"                    true,"},
{"lineNum":"  179","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6766","possible_hits":"1",},
{"lineNum":"  180","line":"                );"},
{"lineNum":"  181","line":"            }"},
{"lineNum":"  182","line":"        }).setup,"},
{"lineNum":"  183","line":"    }).run(.Call, .{","class":"lineCov","hits":"1","order":"6758","possible_hits":"1",},
{"lineNum":"  184","line":"        .expr = func,","class":"lineCov","hits":"1","order":"6756","possible_hits":"1",},
{"lineNum":"  185","line":"        .args = args,","class":"lineCov","hits":"1","order":"6757","possible_hits":"1",},
{"lineNum":"  186","line":"    });"},
{"lineNum":"  187","line":"}"},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"test \"an error is thrown when calling a function with a wrong argument count\" {","class":"lineCov","hits":"3","order":"6773","possible_hits":"3",},
{"lineNum":"  190","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    const func = node.makeNode(alloc, Cursor.new(0, 0), .Ident, \"aFunction\");","class":"lineCov","hits":"1","order":"6774","possible_hits":"1",},
{"lineNum":"  193","line":"    defer alloc.destroy(func);","class":"linePartCov","hits":"1","order":"6807","possible_hits":"3",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    const arg = node.makeNode(alloc, Cursor.new(0, 0), .Int, \"34\");","class":"lineCov","hits":"1","order":"6775","possible_hits":"1",},
{"lineNum":"  196","line":"    defer alloc.destroy(arg);","class":"linePartCov","hits":"1","order":"6806","possible_hits":"3",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"    var args = node.NodeList{};","class":"lineCov","hits":"1","order":"6776","possible_hits":"1",},
{"lineNum":"  199","line":"    defer args.deinit(alloc);","class":"linePartCov","hits":"1","order":"6805","possible_hits":"3",},
{"lineNum":"  200","line":"    try args.append(alloc, arg);","class":"linePartCov","hits":"1","order":"6777","possible_hits":"2",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6804","possible_hits":"2",},
{"lineNum":"  203","line":"        .setup = (struct {"},
{"lineNum":"  204","line":"            fn setup(","class":"lineCov","hits":"1","order":"6781","possible_hits":"1",},
{"lineNum":"  205","line":"                scope: *Scope,"},
{"lineNum":"  206","line":"                typebook: *TypeBook,"},
{"lineNum":"  207","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6789","possible_hits":"1",},
{"lineNum":"  208","line":"                scope.put(","class":"lineCov","hits":"2","order":"6782","possible_hits":"2",},
{"lineNum":"  209","line":"                    \"aFunction\","},
{"lineNum":"  210","line":"                    typebook.getFunction(","class":"lineCov","hits":"2","order":"6783","possible_hits":"2",},
{"lineNum":"  211","line":"                        typebook.getBoolean(),","class":"lineCov","hits":"1","order":"6784","possible_hits":"1",},
{"lineNum":"  212","line":"                        &[_]Type.Ptr{","class":"lineCov","hits":"1","order":"6787","possible_hits":"1",},
{"lineNum":"  213","line":"                            typebook.getNumber(),","class":"lineCov","hits":"1","order":"6785","possible_hits":"1",},
{"lineNum":"  214","line":"                            typebook.getString(),","class":"lineCov","hits":"1","order":"6786","possible_hits":"1",},
{"lineNum":"  215","line":"                        },"},
{"lineNum":"  216","line":"                        false,"},
{"lineNum":"  217","line":"                    ),"},
{"lineNum":"  218","line":"                    true,"},
{"lineNum":"  219","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6788","possible_hits":"1",},
{"lineNum":"  220","line":"                );"},
{"lineNum":"  221","line":"            }"},
{"lineNum":"  222","line":"        }).setup,"},
{"lineNum":"  223","line":"        .check = (struct {"},
{"lineNum":"  224","line":"            fn check(","class":"lineCov","hits":"1","order":"6795","possible_hits":"1",},
{"lineNum":"  225","line":"                scope: *Scope,"},
{"lineNum":"  226","line":"                typebook: *TypeBook,"},
{"lineNum":"  227","line":"                res: InferResult,"},
{"lineNum":"  228","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6803","possible_hits":"1",},
{"lineNum":"  229","line":"                _ = scope;"},
{"lineNum":"  230","line":"                _ = typebook;"},
{"lineNum":"  231","line":""},
{"lineNum":"  232","line":"                try std.testing.expectEqual(","class":"lineCov","hits":"1","order":"6797","possible_hits":"1",},
{"lineNum":"  233","line":"                    InferResult.Variant.Error,"},
{"lineNum":"  234","line":"                    res.getType(),","class":"lineCov","hits":"1","order":"6796","possible_hits":"1",},
{"lineNum":"  235","line":"                );"},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"                const err = res.Error;","class":"linePartCov","hits":"2","order":"6798","possible_hits":"3",},
{"lineNum":"  238","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6800","possible_hits":"2",},
{"lineNum":"  239","line":"                    CompileError.Type.GenericError,"},
{"lineNum":"  240","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"6799","possible_hits":"1",},
{"lineNum":"  241","line":"                );"},
{"lineNum":"  242","line":"                try std.testing.expectEqualStrings(","class":"linePartCov","hits":"1","order":"6802","possible_hits":"2",},
{"lineNum":"  243","line":"                    \"Function expected 2 arguments but found 1\","},
{"lineNum":"  244","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"6801","possible_hits":"3",},
{"lineNum":"  245","line":"                );"},
{"lineNum":"  246","line":"            }"},
{"lineNum":"  247","line":"        }).check,"},
{"lineNum":"  248","line":"    }).run(.Call, .{","class":"lineCov","hits":"1","order":"6780","possible_hits":"1",},
{"lineNum":"  249","line":"        .expr = func,","class":"lineCov","hits":"1","order":"6778","possible_hits":"1",},
{"lineNum":"  250","line":"        .args = args,","class":"lineCov","hits":"1","order":"6779","possible_hits":"1",},
{"lineNum":"  251","line":"    });"},
{"lineNum":"  252","line":"}"},
{"lineNum":"  253","line":""},
{"lineNum":"  254","line":"test \"an error is thrown if function arguments have incorrect types\" {","class":"lineCov","hits":"3","order":"6808","possible_hits":"3",},
{"lineNum":"  255","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"    const func = node.makeNode(alloc, Cursor.new(0, 0), .Ident, \"aFunction\");","class":"lineCov","hits":"1","order":"6809","possible_hits":"1",},
{"lineNum":"  258","line":"    defer alloc.destroy(func);","class":"linePartCov","hits":"1","order":"6841","possible_hits":"3",},
{"lineNum":"  259","line":""},
{"lineNum":"  260","line":"    const arg = node.makeNode(alloc, Cursor.new(0, 0), .Int, \"34\");","class":"lineCov","hits":"1","order":"6810","possible_hits":"1",},
{"lineNum":"  261","line":"    defer alloc.destroy(arg);","class":"linePartCov","hits":"1","order":"6840","possible_hits":"3",},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"    var args = node.NodeList{};","class":"lineCov","hits":"1","order":"6811","possible_hits":"1",},
{"lineNum":"  264","line":"    defer args.deinit(alloc);","class":"linePartCov","hits":"1","order":"6839","possible_hits":"3",},
{"lineNum":"  265","line":"    try args.append(alloc, arg);","class":"linePartCov","hits":"1","order":"6812","possible_hits":"2",},
{"lineNum":"  266","line":""},
{"lineNum":"  267","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6838","possible_hits":"2",},
{"lineNum":"  268","line":"        .setup = (struct {"},
{"lineNum":"  269","line":"            fn setup(","class":"lineCov","hits":"1","order":"6816","possible_hits":"1",},
{"lineNum":"  270","line":"                scope: *Scope,"},
{"lineNum":"  271","line":"                typebook: *TypeBook,"},
{"lineNum":"  272","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6822","possible_hits":"1",},
{"lineNum":"  273","line":"                scope.put(","class":"lineCov","hits":"2","order":"6817","possible_hits":"2",},
{"lineNum":"  274","line":"                    \"aFunction\","},
{"lineNum":"  275","line":"                    typebook.getFunction(","class":"lineCov","hits":"2","order":"6818","possible_hits":"2",},
{"lineNum":"  276","line":"                        typebook.getBoolean(),","class":"lineCov","hits":"1","order":"6819","possible_hits":"1",},
{"lineNum":"  277","line":"                        &[_]Type.Ptr{typebook.getString()},","class":"lineCov","hits":"1","order":"6820","possible_hits":"1",},
{"lineNum":"  278","line":"                        false,"},
{"lineNum":"  279","line":"                    ),"},
{"lineNum":"  280","line":"                    true,"},
{"lineNum":"  281","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6821","possible_hits":"1",},
{"lineNum":"  282","line":"                );"},
{"lineNum":"  283","line":"            }"},
{"lineNum":"  284","line":"        }).setup,"},
{"lineNum":"  285","line":"        .check = (struct {"},
{"lineNum":"  286","line":"            fn check(","class":"lineCov","hits":"1","order":"6825","possible_hits":"1",},
{"lineNum":"  287","line":"                scope: *Scope,"},
{"lineNum":"  288","line":"                typebook: *TypeBook,"},
{"lineNum":"  289","line":"                res: InferResult,"},
{"lineNum":"  290","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6837","possible_hits":"1",},
{"lineNum":"  291","line":"                _ = scope;"},
{"lineNum":"  292","line":""},
{"lineNum":"  293","line":"                try std.testing.expectEqual(","class":"lineCov","hits":"1","order":"6827","possible_hits":"1",},
{"lineNum":"  294","line":"                    InferResult.Variant.Error,"},
{"lineNum":"  295","line":"                    res.getType(),","class":"lineCov","hits":"1","order":"6826","possible_hits":"1",},
{"lineNum":"  296","line":"                );"},
{"lineNum":"  297","line":""},
{"lineNum":"  298","line":"                const err = res.Error;","class":"linePartCov","hits":"2","order":"6828","possible_hits":"3",},
{"lineNum":"  299","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6830","possible_hits":"2",},
{"lineNum":"  300","line":"                    CompileError.Type.TypeError,"},
{"lineNum":"  301","line":"                    err.getType(),","class":"lineCov","hits":"1","order":"6829","possible_hits":"1",},
{"lineNum":"  302","line":"                );"},
{"lineNum":"  303","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6833","possible_hits":"2",},
{"lineNum":"  304","line":"                    err.TypeError.valueTy,","class":"linePartCov","hits":"2","order":"6831","possible_hits":"3",},
{"lineNum":"  305","line":"                    typebook.getNumber(),","class":"lineCov","hits":"1","order":"6832","possible_hits":"1",},
{"lineNum":"  306","line":"                );"},
{"lineNum":"  307","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6836","possible_hits":"2",},
{"lineNum":"  308","line":"                    err.TypeError.targetTy,","class":"linePartCov","hits":"2","order":"6834","possible_hits":"3",},
{"lineNum":"  309","line":"                    typebook.getString(),","class":"lineCov","hits":"1","order":"6835","possible_hits":"1",},
{"lineNum":"  310","line":"                );"},
{"lineNum":"  311","line":"            }"},
{"lineNum":"  312","line":"        }).check,"},
{"lineNum":"  313","line":"    }).run(.Call, .{","class":"lineCov","hits":"1","order":"6815","possible_hits":"1",},
{"lineNum":"  314","line":"        .expr = func,","class":"lineCov","hits":"1","order":"6813","possible_hits":"1",},
{"lineNum":"  315","line":"        .args = args,","class":"lineCov","hits":"1","order":"6814","possible_hits":"1",},
{"lineNum":"  316","line":"    });"},
{"lineNum":"  317","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:46:05", "instrumented" : 137, "covered" : 123,};
var merged_data = [];
