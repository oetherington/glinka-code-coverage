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
{"lineNum":"   26","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   27","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   28","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   29","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   30","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   31","line":"const allocate = @import(\"../../common/allocate.zig\");"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"pub fn inferDotType(","class":"lineCov","hits":"1","order":"6937","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp: *Compiler,"},
{"lineNum":"   35","line":"    nd: node.Node,"},
{"lineNum":"   36","line":"    ctx: *const InferContext,"},
{"lineNum":"   37","line":"    dot: node.Dot,"},
{"lineNum":"   38","line":") InferResult {"},
{"lineNum":"   39","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"6938","possible_hits":"1",},
{"lineNum":"   40","line":"    const expr = inferExprType(cmp, dot.expr, &subCtx);","class":"lineCov","hits":"1","order":"6939","possible_hits":"1",},
{"lineNum":"   41","line":"    switch (expr) {","class":"linePartCov","hits":"1","order":"6940","possible_hits":"2",},
{"lineNum":"   42","line":"        .Success => |exprTy| {","class":"lineCov","hits":"1","order":"6941","possible_hits":"1",},
{"lineNum":"   43","line":"            if (exprTy.getType() == .Interface) {","class":"lineCov","hits":"3","order":"6942","possible_hits":"3",},
{"lineNum":"   44","line":"                const mem = exprTy.Interface.getNamedMember(","class":"linePartCov","hits":"2","order":"6943","possible_hits":"3",},
{"lineNum":"   45","line":"                    dot.ident,","class":"lineCov","hits":"1","order":"6944","possible_hits":"1",},
{"lineNum":"   46","line":"                ) orelse return InferResult.err(CompileError.genericError(","class":"linePartCov","hits":"1","order":"6945","possible_hits":"2",},
{"lineNum":"   47","line":"                    GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"                        nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"                        cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"                            \"Object property {s} does not exist\","},
{"lineNum":"   51","line":"                            .{dot.ident},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"                        ),"},
{"lineNum":"   53","line":"                    ),"},
{"lineNum":"   54","line":"                ));"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"                nd.ty = mem.ty;","class":"lineCov","hits":"1","order":"6946","possible_hits":"1",},
{"lineNum":"   57","line":"            } else if (exprTy.getType() == .Class) {","class":"lineCov","hits":"1","order":"6979","possible_hits":"1",},
{"lineNum":"   58","line":"                const mem = exprTy.Class.getNamedMember(","class":"linePartCov","hits":"2","order":"6980","possible_hits":"3",},
{"lineNum":"   59","line":"                    dot.ident,","class":"lineCov","hits":"1","order":"6981","possible_hits":"1",},
{"lineNum":"   60","line":"                ) orelse return InferResult.err(CompileError.genericError(","class":"linePartCov","hits":"2","order":"6982","possible_hits":"3",},
{"lineNum":"   61","line":"                    GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"                        nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"                        cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   64","line":"                            \"Class {s} has no member called {s}\","},
{"lineNum":"   65","line":"                            .{ exprTy.Class.name, dot.ident },","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   66","line":"                        ),"},
{"lineNum":"   67","line":"                    ),"},
{"lineNum":"   68","line":"                ));"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"                if (!ctx.hasAccessTo(exprTy, mem.visibility))","class":"lineCov","hits":"2","order":"6983","possible_hits":"2",},
{"lineNum":"   71","line":"                    return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"                        GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"                            nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"                            cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"                                \"Class member \'{s}\' is {s}\","},
{"lineNum":"   76","line":"                                .{ mem.name, mem.visibility.toString() },","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"                            ),"},
{"lineNum":"   78","line":"                        ),"},
{"lineNum":"   79","line":"                    ));"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"                nd.ty = mem.ty;","class":"lineCov","hits":"1","order":"6984","possible_hits":"1",},
{"lineNum":"   82","line":"            } else {"},
{"lineNum":"   83","line":"                return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"                    GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"                        nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"                        cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"                            \"Using \'.\' operator on non-object value\","},
{"lineNum":"   88","line":"                            .{},"},
{"lineNum":"   89","line":"                        ),"},
{"lineNum":"   90","line":"                    ),"},
{"lineNum":"   91","line":"                ));"},
{"lineNum":"   92","line":"            }"},
{"lineNum":"   93","line":"        },"},
{"lineNum":"   94","line":"        .Error => return expr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"6947","possible_hits":"2",},
{"lineNum":"   98","line":"}"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"test \"can infer type of a dot expression with an object\" {","class":"lineCov","hits":"3","order":"6932","possible_hits":"3",},
{"lineNum":"  101","line":"    const nd = node.makeNode(","class":"lineCov","hits":"1","order":"6934","possible_hits":"1",},
{"lineNum":"  102","line":"        std.testing.allocator,"},
{"lineNum":"  103","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"6933","possible_hits":"1",},
{"lineNum":"  104","line":"        .Ident,"},
{"lineNum":"  105","line":"        \"console\","},
{"lineNum":"  106","line":"    );"},
{"lineNum":"  107","line":"    defer std.testing.allocator.destroy(nd);","class":"linePartCov","hits":"1","order":"6958","possible_hits":"2",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6957","possible_hits":"2",},
{"lineNum":"  110","line":"        .check = (struct {"},
{"lineNum":"  111","line":"            fn check(","class":"lineCov","hits":"1","order":"6948","possible_hits":"1",},
{"lineNum":"  112","line":"                scope: *Scope,"},
{"lineNum":"  113","line":"                typebook: *TypeBook,"},
{"lineNum":"  114","line":"                res: InferResult,"},
{"lineNum":"  115","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6956","possible_hits":"1",},
{"lineNum":"  116","line":"                _ = scope;"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"6949","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"                const ty = res.Success;","class":"linePartCov","hits":"2","order":"6950","possible_hits":"3",},
{"lineNum":"  121","line":"                const consoleLogTy = typebook.getFunction(","class":"lineCov","hits":"2","order":"6951","possible_hits":"2",},
{"lineNum":"  122","line":"                    typebook.getVoid(),","class":"lineCov","hits":"1","order":"6952","possible_hits":"1",},
{"lineNum":"  123","line":"                    &[_]Type.Ptr{typebook.getAny()},","class":"lineCov","hits":"1","order":"6953","possible_hits":"1",},
{"lineNum":"  124","line":"                    false,"},
{"lineNum":"  125","line":"                );"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"                try std.testing.expectEqual(Type.Type.Function, ty.getType());","class":"linePartCov","hits":"1","order":"6954","possible_hits":"2",},
{"lineNum":"  128","line":"                try std.testing.expectEqual(consoleLogTy, ty);","class":"lineCov","hits":"1","order":"6955","possible_hits":"1",},
{"lineNum":"  129","line":"            }"},
{"lineNum":"  130","line":"        }).check,"},
{"lineNum":"  131","line":"    }).run(.Dot, node.Dot{ .expr = nd, .ident = \"log\" });","class":"lineCov","hits":"1","order":"6935","possible_hits":"1",},
{"lineNum":"  132","line":"}"},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"test \"can infer type of a dot expression with a class\" {","class":"lineCov","hits":"3","order":"6959","possible_hits":"3",},
{"lineNum":"  135","line":"    const nd = node.makeNode(","class":"lineCov","hits":"1","order":"6961","possible_hits":"1",},
{"lineNum":"  136","line":"        std.testing.allocator,"},
{"lineNum":"  137","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"6960","possible_hits":"1",},
{"lineNum":"  138","line":"        .Ident,"},
{"lineNum":"  139","line":"        \"myInstance\","},
{"lineNum":"  140","line":"    );"},
{"lineNum":"  141","line":"    defer std.testing.allocator.destroy(nd);","class":"linePartCov","hits":"1","order":"6990","possible_hits":"2",},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6989","possible_hits":"2",},
{"lineNum":"  144","line":"        .setup = (struct {"},
{"lineNum":"  145","line":"            fn setup(","class":"lineCov","hits":"1","order":"6963","possible_hits":"1",},
{"lineNum":"  146","line":"                scope: *Scope,"},
{"lineNum":"  147","line":"                typebook: *TypeBook,"},
{"lineNum":"  148","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6978","possible_hits":"1",},
{"lineNum":"  149","line":"                var members = allocate.alloc(","class":"lineCov","hits":"1","order":"6964","possible_hits":"1",},
{"lineNum":"  150","line":"                    std.testing.allocator,"},
{"lineNum":"  151","line":"                    Type.ClassType.Member,"},
{"lineNum":"  152","line":"                    1,"},
{"lineNum":"  153","line":"                );"},
{"lineNum":"  154","line":"                members[0] = Type.ClassType.Member{","class":"lineCov","hits":"1","order":"6965","possible_hits":"1",},
{"lineNum":"  155","line":"                    .name = \"member\",","class":"lineCov","hits":"1","order":"6966","possible_hits":"1",},
{"lineNum":"  156","line":"                    .ty = typebook.getNumber(),","class":"lineCov","hits":"1","order":"6967","possible_hits":"1",},
{"lineNum":"  157","line":"                    .visibility = .Public,","class":"lineCov","hits":"1","order":"6968","possible_hits":"1",},
{"lineNum":"  158","line":"                };"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"                var ty = allocate.create(std.testing.allocator, Type);","class":"lineCov","hits":"1","order":"6969","possible_hits":"1",},
{"lineNum":"  161","line":"                ty.* = Type{","class":"lineCov","hits":"1","order":"6970","possible_hits":"1",},
{"lineNum":"  162","line":"                    .Class = Type.ClassType.new(null, \"MyClass\", members),","class":"lineCov","hits":"1","order":"6971","possible_hits":"1",},
{"lineNum":"  163","line":"                };"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"                typebook.putClass(ty);","class":"lineCov","hits":"1","order":"6972","possible_hits":"1",},
{"lineNum":"  166","line":"                scope.putType(\"MyClass\", ty);","class":"lineCov","hits":"1","order":"6973","possible_hits":"1",},
{"lineNum":"  167","line":"                scope.put(","class":"lineCov","hits":"2","order":"6974","possible_hits":"2",},
{"lineNum":"  168","line":"                    \"MyClass\","},
{"lineNum":"  169","line":"                    typebook.getFunction(ty, &[_]Type.Ptr{}, true),","class":"lineCov","hits":"1","order":"6975","possible_hits":"1",},
{"lineNum":"  170","line":"                    true,"},
{"lineNum":"  171","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6976","possible_hits":"1",},
{"lineNum":"  172","line":"                );"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"                scope.put(\"myInstance\", ty, true, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"6977","possible_hits":"1",},
{"lineNum":"  175","line":"            }"},
{"lineNum":"  176","line":"        }).setup,"},
{"lineNum":"  177","line":"        .check = (struct {"},
{"lineNum":"  178","line":"            fn check(","class":"lineCov","hits":"1","order":"6985","possible_hits":"1",},
{"lineNum":"  179","line":"                scope: *Scope,"},
{"lineNum":"  180","line":"                typebook: *TypeBook,"},
{"lineNum":"  181","line":"                res: InferResult,"},
{"lineNum":"  182","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6988","possible_hits":"1",},
{"lineNum":"  183","line":"                _ = scope;"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"6986","possible_hits":"1",},
{"lineNum":"  186","line":"                try std.testing.expectEqual(typebook.getNumber(), res.Success);","class":"lineCov","hits":"2","order":"6987","possible_hits":"2",},
{"lineNum":"  187","line":"            }"},
{"lineNum":"  188","line":"        }).check,"},
{"lineNum":"  189","line":"    }).run(.Dot, node.Dot{ .expr = nd, .ident = \"member\" });","class":"lineCov","hits":"1","order":"6962","possible_hits":"1",},
{"lineNum":"  190","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:59:51", "instrumented" : 76, "covered" : 58,};
var merged_data = [];
