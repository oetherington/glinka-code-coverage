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
{"lineNum":"   33","line":"pub fn inferArrayAccessType(","class":"lineCov","hits":"1","order":"6911","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp: *Compiler,"},
{"lineNum":"   35","line":"    nd: node.Node,"},
{"lineNum":"   36","line":"    ctx: *const InferContext,"},
{"lineNum":"   37","line":"    access: node.ArrayAccess,"},
{"lineNum":"   38","line":") InferResult {"},
{"lineNum":"   39","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"6912","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    const expr = inferExprType(cmp, access.expr, &subCtx);","class":"lineCov","hits":"1","order":"6913","possible_hits":"1",},
{"lineNum":"   42","line":"    if (expr.getType() != .Success)","class":"lineCov","hits":"2","order":"6914","possible_hits":"2",},
{"lineNum":"   43","line":"        return expr;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    const exprTy = expr.Success;","class":"linePartCov","hits":"2","order":"6915","possible_hits":"3",},
{"lineNum":"   46","line":"    if (exprTy.getType() != .Array) {","class":"lineCov","hits":"2","order":"6916","possible_hits":"2",},
{"lineNum":"   47","line":"        return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"            GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"                access.expr.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"                \"Invalid array access - expression is not an array\","},
{"lineNum":"   51","line":"            ),"},
{"lineNum":"   52","line":"        ));"},
{"lineNum":"   53","line":"    }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    const index = inferExprType(cmp, access.index, &subCtx);","class":"lineCov","hits":"1","order":"6917","possible_hits":"1",},
{"lineNum":"   56","line":"    if (index.getType() != .Success)","class":"lineCov","hits":"2","order":"6918","possible_hits":"2",},
{"lineNum":"   57","line":"        return index;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    const indexTy = index.Success;","class":"linePartCov","hits":"2","order":"6919","possible_hits":"3",},
{"lineNum":"   60","line":"    if (indexTy.getType() != .Number) {","class":"lineCov","hits":"2","order":"6920","possible_hits":"2",},
{"lineNum":"   61","line":"        return InferResult.err(CompileError.typeError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"            TypeError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"                access.index.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"                indexTy,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"                cmp.typebook.getNumber(),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"            ),"},
{"lineNum":"   67","line":"        ));"},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    nd.ty = exprTy.Array.subtype;","class":"linePartCov","hits":"2","order":"6921","possible_hits":"3",},
{"lineNum":"   71","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"6922","possible_hits":"2",},
{"lineNum":"   72","line":"}"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"test \"can infer type of an array access\" {","class":"lineCov","hits":"3","order":"6898","possible_hits":"3",},
{"lineNum":"   75","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   76","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6899","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    const expr = node.makeNode(alloc, csr, .Ident, \"anArray\");","class":"lineCov","hits":"1","order":"6900","possible_hits":"1",},
{"lineNum":"   79","line":"    const index = node.makeNode(alloc, csr, .Int, \"1\");","class":"lineCov","hits":"1","order":"6901","possible_hits":"1",},
{"lineNum":"   80","line":"    defer alloc.destroy(expr);","class":"linePartCov","hits":"1","order":"6931","possible_hits":"2",},
{"lineNum":"   81","line":"    defer alloc.destroy(index);","class":"linePartCov","hits":"1","order":"6930","possible_hits":"2",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6929","possible_hits":"2",},
{"lineNum":"   84","line":"        .setup = (struct {"},
{"lineNum":"   85","line":"            fn setup(","class":"lineCov","hits":"1","order":"6905","possible_hits":"1",},
{"lineNum":"   86","line":"                scope: *Scope,"},
{"lineNum":"   87","line":"                typebook: *TypeBook,"},
{"lineNum":"   88","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6909","possible_hits":"1",},
{"lineNum":"   89","line":"                scope.put(","class":"lineCov","hits":"2","order":"6906","possible_hits":"2",},
{"lineNum":"   90","line":"                    \"anArray\","},
{"lineNum":"   91","line":"                    typebook.getArray(typebook.getString()),","class":"lineCov","hits":"1","order":"6907","possible_hits":"1",},
{"lineNum":"   92","line":"                    true,"},
{"lineNum":"   93","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6908","possible_hits":"1",},
{"lineNum":"   94","line":"                );"},
{"lineNum":"   95","line":"            }"},
{"lineNum":"   96","line":"        }).setup,"},
{"lineNum":"   97","line":"        .check = (struct {"},
{"lineNum":"   98","line":"            fn check(","class":"lineCov","hits":"1","order":"6923","possible_hits":"1",},
{"lineNum":"   99","line":"                scope: *Scope,"},
{"lineNum":"  100","line":"                typebook: *TypeBook,"},
{"lineNum":"  101","line":"                res: InferResult,"},
{"lineNum":"  102","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6928","possible_hits":"1",},
{"lineNum":"  103","line":"                _ = scope;"},
{"lineNum":"  104","line":"                _ = typebook;"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"                try std.testing.expectEqual(","class":"lineCov","hits":"1","order":"6925","possible_hits":"1",},
{"lineNum":"  107","line":"                    InferResult.Variant.Success,"},
{"lineNum":"  108","line":"                    res.getType(),","class":"lineCov","hits":"1","order":"6924","possible_hits":"1",},
{"lineNum":"  109","line":"                );"},
{"lineNum":"  110","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6927","possible_hits":"2",},
{"lineNum":"  111","line":"                    Type.Type.String,"},
{"lineNum":"  112","line":"                    res.Success.getType(),","class":"linePartCov","hits":"2","order":"6926","possible_hits":"3",},
{"lineNum":"  113","line":"                );"},
{"lineNum":"  114","line":"            }"},
{"lineNum":"  115","line":"        }).check,"},
{"lineNum":"  116","line":"    }).run(.ArrayAccess, node.ArrayAccess{","class":"lineCov","hits":"1","order":"6904","possible_hits":"1",},
{"lineNum":"  117","line":"        .expr = expr,","class":"lineCov","hits":"1","order":"6902","possible_hits":"1",},
{"lineNum":"  118","line":"        .index = index,","class":"lineCov","hits":"1","order":"6903","possible_hits":"1",},
{"lineNum":"  119","line":"    });"},
{"lineNum":"  120","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:39:00", "instrumented" : 43, "covered" : 33,};
var merged_data = [];
