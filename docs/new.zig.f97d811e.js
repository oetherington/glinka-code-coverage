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
{"lineNum":"   33","line":"pub fn inferNewType(","class":"lineCov","hits":"1","order":"7052","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp: *Compiler,"},
{"lineNum":"   35","line":"    nd: node.Node,"},
{"lineNum":"   36","line":"    ctx: *const InferContext,"},
{"lineNum":"   37","line":"    new: node.Node,"},
{"lineNum":"   38","line":") InferResult {"},
{"lineNum":"   39","line":"    const subCtx = InferContext.new(ctx);","class":"lineCov","hits":"1","order":"7053","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    const res = inferExprType(cmp, new, &subCtx);","class":"lineCov","hits":"1","order":"7054","possible_hits":"1",},
{"lineNum":"   42","line":"    if (res.getType() != .Success)","class":"lineCov","hits":"2","order":"7055","possible_hits":"2",},
{"lineNum":"   43","line":"        return res;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    const ty = res.Success;","class":"linePartCov","hits":"2","order":"7056","possible_hits":"3",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    if (new.getType() == .Call) {","class":"linePartCov","hits":"2","order":"7057","possible_hits":"3",},
{"lineNum":"   48","line":"        // We already checked the expression is constructable is the"},
{"lineNum":"   49","line":"        // call to inferExprType above"},
{"lineNum":"   50","line":"        nd.ty = ty;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    } else {"},
{"lineNum":"   52","line":"        if (ty.getType() != .Function or !ty.Function.isConstructable) {","class":"lineCov","hits":"3","order":"7058","possible_hits":"3",},
{"lineNum":"   53","line":"            return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"                GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"                    nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"                    \"Expression type is not constructable\","},
{"lineNum":"   57","line":"                ),"},
{"lineNum":"   58","line":"            ));"},
{"lineNum":"   59","line":"        }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"        nd.ty = ty.Function.ret;","class":"linePartCov","hits":"2","order":"7059","possible_hits":"3",},
{"lineNum":"   62","line":"    }"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"7060","possible_hits":"2",},
{"lineNum":"   65","line":"}"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"test \"can infer type of a new expression with an Ident\" {","class":"lineCov","hits":"3","order":"7037","possible_hits":"3",},
{"lineNum":"   68","line":"    const nd = node.makeNode(","class":"lineCov","hits":"1","order":"7039","possible_hits":"1",},
{"lineNum":"   69","line":"        std.testing.allocator,"},
{"lineNum":"   70","line":"        Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"7038","possible_hits":"1",},
{"lineNum":"   71","line":"        .Ident,"},
{"lineNum":"   72","line":"        \"MyClass\","},
{"lineNum":"   73","line":"    );"},
{"lineNum":"   74","line":"    defer std.testing.allocator.destroy(nd);","class":"linePartCov","hits":"1","order":"7069","possible_hits":"2",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"7068","possible_hits":"2",},
{"lineNum":"   77","line":"        .setup = (struct {"},
{"lineNum":"   78","line":"            fn setup(","class":"lineCov","hits":"1","order":"7041","possible_hits":"1",},
{"lineNum":"   79","line":"                scope: *Scope,"},
{"lineNum":"   80","line":"                typebook: *TypeBook,"},
{"lineNum":"   81","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"7050","possible_hits":"1",},
{"lineNum":"   82","line":"                var ty = allocate.create(std.testing.allocator, Type);","class":"lineCov","hits":"1","order":"7042","possible_hits":"1",},
{"lineNum":"   83","line":"                ty.* = Type{","class":"lineCov","hits":"1","order":"7043","possible_hits":"1",},
{"lineNum":"   84","line":"                    .Class = Type.ClassType.new(","class":"lineCov","hits":"1","order":"7044","possible_hits":"1",},
{"lineNum":"   85","line":"                        null,"},
{"lineNum":"   86","line":"                        \"MyClass\","},
{"lineNum":"   87","line":"                        &[_]Type.ClassType.Member{},"},
{"lineNum":"   88","line":"                    ),"},
{"lineNum":"   89","line":"                };"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"                typebook.putClass(ty);","class":"lineCov","hits":"1","order":"7045","possible_hits":"1",},
{"lineNum":"   92","line":"                scope.putType(\"MyClass\", ty);","class":"lineCov","hits":"1","order":"7046","possible_hits":"1",},
{"lineNum":"   93","line":"                scope.put(","class":"lineCov","hits":"2","order":"7047","possible_hits":"2",},
{"lineNum":"   94","line":"                    \"MyClass\","},
{"lineNum":"   95","line":"                    typebook.getFunction(ty, &[_]Type.Ptr{}, true),","class":"lineCov","hits":"1","order":"7048","possible_hits":"1",},
{"lineNum":"   96","line":"                    true,"},
{"lineNum":"   97","line":"                    Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"7049","possible_hits":"1",},
{"lineNum":"   98","line":"                );"},
{"lineNum":"   99","line":"            }"},
{"lineNum":"  100","line":"        }).setup,"},
{"lineNum":"  101","line":"        .check = (struct {"},
{"lineNum":"  102","line":"            fn check(","class":"lineCov","hits":"1","order":"7061","possible_hits":"1",},
{"lineNum":"  103","line":"                scope: *Scope,"},
{"lineNum":"  104","line":"                typebook: *TypeBook,"},
{"lineNum":"  105","line":"                res: InferResult,"},
{"lineNum":"  106","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"7067","possible_hits":"1",},
{"lineNum":"  107","line":"                _ = typebook;"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"7062","possible_hits":"1",},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"                const ty = res.Success;","class":"linePartCov","hits":"2","order":"7063","possible_hits":"3",},
{"lineNum":"  112","line":"                const classTy = scope.getType(\"MyClass\").?;","class":"linePartCov","hits":"1","order":"7064","possible_hits":"2",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"                try std.testing.expectEqual(Type.Type.Class, ty.getType());","class":"linePartCov","hits":"1","order":"7065","possible_hits":"2",},
{"lineNum":"  115","line":"                try std.testing.expectEqual(classTy, ty);","class":"lineCov","hits":"1","order":"7066","possible_hits":"1",},
{"lineNum":"  116","line":"            }"},
{"lineNum":"  117","line":"        }).check,"},
{"lineNum":"  118","line":"    }).run(.New, nd);","class":"lineCov","hits":"1","order":"7040","possible_hits":"1",},
{"lineNum":"  119","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 08:56:39", "instrumented" : 37, "covered" : 32,};
var merged_data = [];
